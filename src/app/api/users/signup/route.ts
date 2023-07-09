import { connect } from "@/database/config";
import User from "@/database/model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()


export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      const { username, email, password } = reqBody;

      console.log(reqBody);

      const user = await User.findOne({
         email: email,
      })

      if (user) {
         return NextResponse.json({ error: "User already exists" }, { status: 400 });
      } else {

         const salt = await bcryptjs.genSalt(10);
         const hashedPass = await bcryptjs.hash(password, salt);

         const newUser = new User({
            username,
            email,
            password: hashedPass,

         });

         const savedUser = await newUser.save();
         console.log(savedUser);

         return NextResponse.json({ message: "User added!", success: true, savedUser, });

      }




   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}