import User from "@/database/model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/config";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email } = reqBody;

		console.log(email);

		const foundUser = await User.findOne({
			email: email,
		});
		// console.log(foundUser);

		if (!foundUser) {
			return NextResponse.json(
				{ error: "User not found!" },
				{ status: 400 }
			);
		} else {
			await sendEmail({
				email: foundUser.email,
				emailType: "RESET",
				userId: foundUser._id,
			});

			return NextResponse.json({
				message: "Mail sent!",
				success: true,
			});
		}
	} catch (error: any) {
		console.log(error);

		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
