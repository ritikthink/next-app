import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("reqBody", reqBody);

    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist", status: 400 });
    }

    //check if password is valid
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid Password", status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    // create jwt token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Succesfull!",
      status: true,
    });

    // save token and details in cookies
    response.cookies.set("token", token, { httpOnly: true });

    // return response after saving to cookies
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message, status: 500 });
  }
}
