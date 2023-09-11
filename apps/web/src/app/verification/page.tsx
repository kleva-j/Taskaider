"use client";

import { MagicLinkErrorCode, isMagicLinkError, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function UserVerification() {
  const [status, setStatus] = useState("loading");
  const { handleMagicLinkVerification } = useClerk();

  useEffect(() => {
    async function verify() {
      try {
        await handleMagicLinkVerification({
          redirectUrl: "http://localhost:3000/app",
          redirectUrlComplete: "http://localhost:3000/app",
        });
        setStatus("verified");
      } catch (err: any) {
        let status = "failed";
        if (isMagicLinkError(err) && err.code === MagicLinkErrorCode.Expired)
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
      Successfully Verified. Click <Link href="/app">here</Link> if not
      redirected automatically.
    </div>
  );
}
