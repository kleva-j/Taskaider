import { geolocation } from "@vercel/edge";

export default async function handler(req: Request) {
  const { country, city, latitude, longitude } = geolocation(req);

  return Response.json({ country, city, latitude, longitude });
}

export const runtime = "edge";
