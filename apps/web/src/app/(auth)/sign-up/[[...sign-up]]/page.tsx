"use client";

import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
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

export default function SignUpPage(): JSX.Element {
  const { setLoading, setExpired, setVerified, ...rest } = useAuthState();
  const { ver, exp, loading, onSubmitStart } = rest;
  const { push } = useRouter();

  const { signUp, isLoaded, setActive } = useSignUp();
  const magicLink = signUp?.createEmailLinkFlow();

  const onSubmit = async ({ email }: FormSchemaType) => {
    onSubmitStart();

    const redirectUrl = `${getBaseUrl()}/verification`;

    if (signUp && magicLink) {
      await signUp?.create({ emailAddress: email });

      checkEmailNotifification();

      const res = await magicLink?.startEmailLinkFlow({ redirectUrl });
      const { verifications, createdSessionId, status } = res;

      const verification = verifications.emailAddress;

      if (verification.verifiedFromTheSameClient()) {
        setVerified(true);
        setLoading(false);
        return;
      } else if (verification.status === "expired") setExpired(true);
      if (status === "complete") {
        setActive({ session: createdSessionId ?? "" });
        push("/dashboard");
        return;
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
