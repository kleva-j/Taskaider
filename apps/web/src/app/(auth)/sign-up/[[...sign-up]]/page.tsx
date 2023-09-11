"use client";

import { Alert, AlertDescription, AlertTitle, useToast } from "ui";
import { AlertCircle, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import {
  SignInOAuthBtn,
  FormSchemaType,
  UserAuthForm,
} from "@/app/(auth)/_components";
import { useState } from "react";

export default function SignUpPage(): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [expired, setExpired] = useState(false);

  const { push } = useRouter();
  const { toast } = useToast();

  const { signUp, isLoaded, setActive } = useSignUp();
  const magicLink = signUp?.createMagicLinkFlow();

  const handleSubmit = async ({ email }: FormSchemaType) => {
    setVerified(false);
    setExpired(false);
    setLoading(true);

    if (signUp && magicLink) {
      await signUp?.create({ emailAddress: email });

      toast({
        title: "📧 Check Your Email",
        description: "A verification link has been sent to your email.",
        className: "border-teal-400",
      });

      const su = await magicLink?.startMagicLinkFlow({
        redirectUrl: "http://localhost:3000/verification",
      });

      const verification = su.verifications.emailAddress;

      if (verification.verifiedFromTheSameClient()) {
        setVerified(true);
        setLoading(false);
        return;
      } else if (verification.status === "expired") {
        setExpired(true);
      }
      if (su.status === "complete") {
        setActive({ session: su.createdSessionId || "" });
        push("/app");
        return;
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
