import { NextResponse } from "next/server";

const handler = () => {
  return NextResponse.json(
    { success: true, message: "Test endpoint here" },
    { status: 200 },
  );
};

export { handler as GET };
