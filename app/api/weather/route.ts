import { getWeatherByCity } from "@/lib/weather";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "Missing city parameter" }, { status: 400 });
  }

  try {
    const data = await getWeatherByCity(city);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}
