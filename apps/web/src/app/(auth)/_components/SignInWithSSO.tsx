"use client";

import { OAuthStrategy } from "@clerk/nextjs/server";
import { Icons } from "@/components/Icons";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "ui";

type ButtonProps = {
  isLoading: boolean;
  isLoaded: boolean;
};

export function SignInOAuthBtn(props: ButtonProps) {
  const { isLoading, isLoaded } = props;
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    if (signIn) {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/app",
      });
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={() => signInWith("oauth_github")}
    >
      {isLoading || !isLoaded ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.gitHub className="mr-2 h-4 w-4" />
      )}{" "}
      Github
    </Button>
  );
}
