import nodemailer from "nodemailer";
import User from "@/database/model";
import bcryptjs from "bcryptjs";

type sendEmail = {
	email: string;
	emailType: string;
	userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);

		if (emailType == "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		}
		if (emailType == "RESET") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}

		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS,
			},
		});

		const mailOptions = {
			from: "milindgoel15@gmail.com",
			to: email,
			subject:
				emailType === "RESET" ? "Reset your password" : "Verify your email",
			html: `<p>Click this <a href="${process.env.DOMAIN}/${
				emailType === "RESET"
					? `reset?token=${hashedToken}`
					: `verifyEmail?token=${hashedToken}`
			}">link</a> to  ${
				emailType === "RESET" ? "Reset your password" : "Verify your email"
			} </p>`,
		};

		const mailResponse = await transport.sendMail(mailOptions);

		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
