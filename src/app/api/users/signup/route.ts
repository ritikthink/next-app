import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    console.log("reqBody", reqBody);

    //first check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already exist !" },
        { status: 400 }
      );
    }

    //hash passsword
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully!",
      success: true,
      savedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
