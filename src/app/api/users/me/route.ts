import { connect } from "@/database/config";
import User from "@/database/model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserData } from "@/helpers/getUserData";

connect()

export async function GET(request: NextRequest) {
   try {
      const userId = await getUserData(request);

      const user = await User.findOne({ _id: userId }).select('-password');

      return NextResponse.json(
         { message: 'Got user details', user }
      )

   } catch (error: any) {
      return NextResponse.json(
         { error: error.message },
         { status: 500 }
      )

   }
}