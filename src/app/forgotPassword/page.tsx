"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

let ForgotPasswordPage = () => {
	let [email, setEmail] = useState("");
	let [isLoading, setLoading] = useState(false);
	let [isUserExists, setUserExists] = useState(false);
	let [isButtonDisabled, setButtonDisabled] = useState(false);

	const checkEmailExists = async () => {
		try {
			setLoading(true);
			setButtonDisabled(true);

			await axios.post("/api/users/forgotPassword", { email });

			toast.success("User found!");
			setUserExists(true);
		} catch (error: any) {
			console.log(error.response.data.error);
			if (error.response.data.error == "User not found!") {
				toast.error("User not found!");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (email.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [email]);

	return (
		<>
			<h2 className="text-3xl py-2">
				Check if your email exists in the system
			</h2>
			<p className="text-lg py-2">
				It will send you a mail with instructions to change password
			</p>

			<div className="flex flex-col gap-2 my-6">
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="Enter email here"
						className="px-3 py-2 rounded-md border-2 border-gray-700 active:border-gray-100"
					/>
				</div>
				<button
					onClick={checkEmailExists}
					disabled={isButtonDisabled == false ? false : true}
					className={`bg-blue-500 rounded-md px-3 py-2 text-xl ${
						isButtonDisabled ? "disabled:bg-gray-500" : ""
					}`}
				>
					{isLoading == true ? "Checking email..." : "Send reset mail"}
				</button>
				{isUserExists && <p>User found. Please check your email</p>}
			</div>
		</>
	);
};

export default ForgotPasswordPage;
