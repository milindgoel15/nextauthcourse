import { connect } from "@/database/config";
import User from "@/database/model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function GET() {
	try {
		const response = NextResponse.json({
			message: "Logout success",
			success: true,
		});

		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
