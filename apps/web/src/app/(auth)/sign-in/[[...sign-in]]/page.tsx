"use client";

import { Alert, AlertDescription, AlertTitle, useToast } from "ui";
import { AlertCircle, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

import {
  SignInOAuthBtn,
  FormSchemaType,
  UserAuthForm,
} from "@/app/(auth)/_components";

export default function SignInPage(): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [expired, setExpired] = useState(false);

  const { push } = useRouter();
  const { toast } = useToast();

  const { signIn, isLoaded, setActive } = useSignIn();
  const magicLink = signIn?.createMagicLinkFlow();

  const handleSubmit = async ({ email }: FormSchemaType) => {
    setExpired(false);
    setVerified(false);
    setLoading(true);

    if (signIn && magicLink) {
      const si = await signIn.create({ identifier: email });
      const firstFactor = si.supportedFirstFactors.find(
        (ff) => ff.strategy === "email_link" && ff.safeIdentifier === email,
      ) as any;

      if (firstFactor) {
        toast({
          title: "📧 Check Your Email",
          description: "A verification link has been sent to your email.",
          className: "border-teal-400",
        });

        const res = await magicLink.startMagicLinkFlow({
          emailAddressId: firstFactor?.emailAddressId,
          redirectUrl: "http://localhost:3000/verification",
        });

        const verification = res.firstFactorVerification;
        if (verification.verifiedFromTheSameClient()) {
          setVerified(true);
          setLoading(false);
          return;
        } else if (verification.status === "expired") {
          setExpired(true);
        }
        if (res.status === "complete") {
          setActive({ session: res.createdSessionId });
          push("/dashboard");
          return;
        }
      }
    }
    setLoading(false);
  };

  if (expired) {
    return (
      <Alert>
        <AlertCircle />
        <AlertTitle>Oops!</AlertTitle>
        <AlertDescription>Magic link has expired.</AlertDescription>
      </Alert>
    );
  }

  if (verified) {
    return (
      <Alert>
        <Rocket />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Signed in on other tab</AlertDescription>
      </Alert>
    );
  }

  return (
    <UserAuthForm
      isLoaded={isLoaded}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <SignInOAuthBtn isLoaded={isLoaded} isLoading={isLoading} />
      </>
    </UserAuthForm>
  );
}
