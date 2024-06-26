import { NextRequest, NextResponse } from "next/server";
import { Oumla } from "@oumla/sdk";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { from, to, amount } = body;

  if (req.method === "POST") {
    try {
      const client = new Oumla({
        apiKey: process.env.OUMLA_API_KEY!,
        // Additional options...
      });

      const result = await client.createTransaction({
        network: "BTC",
        amount: amount,
        from: [from],
        to: to,
      });


      return new NextResponse(JSON.stringify({ data: result }), {
        status: 200,
      });
    } catch (error) {
      console.error("Request failed:", error);
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch data from Oumla" }),
        {
          status: 500,
        }
      );
    }
  } else {
    // Handle any requests which aren't POST
    return new NextResponse(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        Allow: "POST",
      },
    });
  }
}
