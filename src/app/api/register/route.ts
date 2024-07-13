import { User } from "@/DBModels/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import ConnectDB from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    // Connect to the database
    await ConnectDB();
    console.log("Database connected successfully.");

    // Parse request body
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return new NextResponse("Invalid input", { status: 400 });
    }
    console.log("Request body parsed:", { username, email });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }
    console.log("No existing user found.");

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed.");

    // Create new user
    // const newUser = await new User({ username, email, password: hashPassword });
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // Save new user to the database
    await newUser.save();
    console.log("User created successfully.");
    return new NextResponse("User created successfully", { status: 201 });
  } catch (error) {
    console.error("Error in creating user:", error);
    return new NextResponse("Error in creating user", { status: 500 });
  }
};
