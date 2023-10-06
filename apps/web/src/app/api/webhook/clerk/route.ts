import { NextRequest, NextResponse } from "next/server";
import { clerkEvent } from "@/server/router/clerk/type";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createContext } from "@/server/context";
import { appRouter } from "@/server/router";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { env } from "@/env";

export async function POST(req: NextRequest) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SIGNING_SECRET;

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
    return new Response("Error occured", {
      status: 400,
    });
  }

  // validate input with zod
  const r = clerkEvent.safeParse(evt.data);

  if (!r.success) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  const caller = appRouter.createCaller(await createContext({ req }));
  const event = r.data.type;

  switch (event) {
    case "user.created": {
      await caller.clerk.webhooks.userCreated({ data: r.data });
      break;
    }
    case "user.updated":
    case "user.deleted":
      break;

    case "session.created": {
      await caller.clerk.webhooks.userSignedIn({ data: r.data });
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
      ((d: never) => console.error(`${d} not handled here`))(event);
      break;
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
