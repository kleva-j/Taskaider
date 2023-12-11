"use client";

import { Alert, AlertDescription, AlertTitle, toast } from "ui";
import { AlertCircle, Rocket } from "lucide-react";
import { useState } from "react";

export const useAuthState = () => {
  const [loading, setLoading] = useState(false);
  const [ver, setVerified] = useState(false);
  const [exp, setExpired] = useState(false);

  const onSubmitStart = () => {
    setVerified(false);
    setExpired(false);
    setLoading(true);
  };

  return {
    ver,
    exp,
    loading,
    setLoading,
    setExpired,
    setVerified,
    onSubmitStart,
  };
};

export const handleAuthState = (expired: boolean, verified: boolean) => {
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
};

export const checkEmailNotifification = () =>
  toast({
    title: "📧 Check Your Email",
    description: "A verification link has been sent to your email.",
    className: "border-teal-400",
  });
