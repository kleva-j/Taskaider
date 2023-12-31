import { NextRequest, NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { serverClient } from "@taskaider/api";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { env } from "@/env";

const handler = async (req: NextRequest) => {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", { status: 400 });
  }

  // // validate input with zod
  // const r = clerkEvent.safeParse(evt.data);

  // if (!r.success) {
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 },
  //   );
  // }

  switch (evt.type) {
    case "user.created": {
      await serverClient(null).clerk.webhooks.userCreated({ data: evt });
      break;
    }
    case "user.updated":
    case "user.deleted":
      break;

    case "session.created": {
      console.log("Session.Created Event", "<<<<====>>>>", evt.data.user_id);
      await serverClient(null).clerk.webhooks.userSignedIn({ data: evt });
      break;
    }

    case "session.revoked":
    case "session.removed":
    case "session.ended":
      break;

    case "organization.created":
    case "organizationMembership.created":
      break;

    default:
      ((d: string) => console.error(`${d} not handled here`))(evt.type);
      break;
  }
  return NextResponse.json({ success: true }, { status: 200 });
};

export { handler as POST };
