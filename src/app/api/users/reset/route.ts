import { connect } from "@/database/config";
import User from "@/database/model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();

		const { token, password } = reqBody;
		console.log(token);
		console.log(password);

		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found or token invalid" },
				{ status: 400 }
			);
		} else {
			const salt = await bcryptjs.genSalt(10);
			const hashedPass = await bcryptjs.hash(password, salt);

			user.password = hashedPass;
			user.forgotPasswordToken = undefined;
			user.forgotPasswordTokenExpiry = undefined;

			await user.save();

			return NextResponse.json({
				message: "password changed successfully",
				success: true,
			});
		}
	} catch (error: any) {
		console.log(error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
