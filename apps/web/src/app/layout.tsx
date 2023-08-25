import "../styles/index.css";
import "ui/styles.css";

import { type PropsWithChildren } from "react";

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
