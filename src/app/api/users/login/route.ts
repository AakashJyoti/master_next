import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, email } = reqBody;

    // Check if user exits
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exits!.." },
        { status: 400 }
      );
    }

    // If the password is correct
    const validatePassword = await compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json(
        { error: "Invalid Credentials!.." },
        { status: 400 }
      );
    }

    // Create token data
    const tokenData = {
      id: user._id,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
