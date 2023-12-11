"use client";

import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { getBaseUrl } from "@/lib/auth";

import {
  checkEmailNotifification,
  handleAuthState,
  SignInOAuthBtn,
  FormSchemaType,
  UserAuthForm,
  useAuthState,
  MoreText,
} from "@/app/(auth)/_components";

export default function SignInPage(): JSX.Element {
  const { setLoading, setExpired, setVerified, ...rest } = useAuthState();
  const { ver, exp, loading, onSubmitStart } = rest;
  const { push } = useRouter();

  const { signIn, isLoaded, setActive } = useSignIn();
  const magicLink = signIn?.createEmailLinkFlow();

  const onSubmit = async ({ email: identifier }: FormSchemaType) => {
    onSubmitStart();

    const redirectUrl = `${getBaseUrl()}/verification`;

    if (signIn && magicLink) {
      const { startEmailLinkFlow } = magicLink;
      const { supportedFirstFactors } = await signIn.create({ identifier });
      const firstFactor = supportedFirstFactors.find(
        (ff) =>
          ff.strategy === "email_link" && ff.safeIdentifier === identifier,
      ) as any;

      if (firstFactor) {
        checkEmailNotifification();
        const { emailAddressId } = firstFactor;
        const res = await startEmailLinkFlow({ emailAddressId, redirectUrl });

        const verification = res.firstFactorVerification;
        if (verification.verifiedFromTheSameClient()) {
          setVerified(true);
          setLoading(false);
          return;
        } else if (verification.status === "expired") setExpired(true);
        if (res.status === "complete") {
          setActive({ session: res.createdSessionId });
          push("/dashboard");
          return;
        }
      }
    }
    setLoading(false);
  };

  handleAuthState(exp, ver);

  return (
    <UserAuthForm isLoaded={isLoaded} isLoading={loading} onSubmit={onSubmit}>
      <>
        <MoreText />
        <SignInOAuthBtn isLoaded={isLoaded} isLoading={loading} />
      </>
    </UserAuthForm>
  );
}
