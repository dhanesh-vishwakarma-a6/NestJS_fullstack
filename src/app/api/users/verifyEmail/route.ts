import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    // get the user on the basis of the token
    const user = await User.findOne({
      verfiedToken: token,
      verifiedTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log(user);

    // reseting the user model fields
    user.isVerified = true;
    user.verfiedToken = undefined;
    user.verifiedTokenExpiry = undefined;
    const userRes = await user.save();
    console.log(userRes)

    // response
    return NextResponse.json({
      message: "Email verfied successfully",
      success: true,
    });

    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
