export const navigationHandle = {
  "sign-in": {
    to: "/sign-up",
    label: "Signup",
    heading: "Log into your account",
    paragraph: "Enter your email below to log into your account",
  },
  "sign-up": {
    to: "/sign-in",
    label: "Login",
    heading: "Create an account",
    paragraph: "Enter your email below to create your account",
  },
};

export function getBaseUrl() {
  if (typeof window !== "undefined" && window.location) {
    return "";
  }
  return process.env.NODE_ENV === "development"
    ? "https://localhost:3000"
    : process.env.VERCEL_URL;
}
