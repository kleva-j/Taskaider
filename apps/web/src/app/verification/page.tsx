"use client";

import { EmailLinkErrorCode, isEmailLinkError, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { getBaseUrl } from "@/lib/auth";

import Link from "next/link";

export default function UserVerification() {
  const [status, setStatus] = useState("loading");
  const { handleEmailLinkVerification } = useClerk();

  useEffect(() => {
    async function verify() {
      try {
        await handleEmailLinkVerification({
          redirectUrl: `${getBaseUrl()}/dashboard`,
          redirectUrlComplete: `${getBaseUrl()}/dashboard`,
        });
        setStatus("verified");
      } catch (err: any) {
        let status = "failed";
        if (isEmailLinkError(err) && err.code === EmailLinkErrorCode.Expired)
          status = "expired";
        setStatus(status);
      }
    }
    verify();
  }, []);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "expired") return <div>Magic link expired</div>;
  if (status === "failed") return <div>Magic link verification failed</div>;

  return (
    <div className="p-4">
      Successfully Verified. Click <Link href="/dashboard">here</Link> if not
      redirected automatically.
    </div>
  );
}
