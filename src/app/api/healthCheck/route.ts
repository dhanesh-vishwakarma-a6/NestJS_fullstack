import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        status: "OK",
        message: "Application is running",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Health Check Error: ", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
