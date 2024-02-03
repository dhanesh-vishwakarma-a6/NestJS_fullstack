import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json();
    const { email } = reqBody;
    console.log("Request Body: ", reqBody);

    // find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Email not registered" },
        { status: 400 }
      );
    }

    // send reset link
    const details = {
      email: email,
      emailType: "RESET",
      userId: user._id,
    };

    const mailerResponse = await sendEmail(details);
    return NextResponse.json({
      message: "Reset link to registered email address",
      response: mailerResponse,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
