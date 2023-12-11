"use client";

import { Alert, AlertTitle, AlertDescription, Button } from "ui";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-items-center h-full">
      <div className="flex justify-center items-center h-full text-gray-500">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Click
            <Button variant="link" onClick={() => reset()}>
              here
            </Button>
            to try again
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
