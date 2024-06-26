import { Oumla } from "@oumla/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (req.method === "POST") {

    try {
      const client = new Oumla({
        apiKey: process.env.OUMLA_API_KEY!,
        // Additional options...
      });

      let address = await client.getAddresses({
        reference: body.reference,
      });

      if (address.addresses.length === 0) {
        const newBtcAddress = await client.generateAddress({
          network: "BTC",
          reference: body.reference,
        });


        address = await client.getAddresses({
          reference: body.reference,
        });
      }


      return new NextResponse(JSON.stringify({ data: address }), {
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
    // res.setHeader("Allow", ["POST"]);
    // res.status(405).end(`Method ${req.method} Not Allowed`);
    return new NextResponse(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        Allow: "POST",
      },
    });
  }
}
