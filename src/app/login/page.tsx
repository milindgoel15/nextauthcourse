"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

let Login = () => {
	const router = useRouter();

	let [user, setUser] = useState({
		email: "",
		password: "",
	});
	let [isButtonDisabled, setButtonDisabled] = useState(false);
	let [isLoading, setLoading] = useState(false);

	let onSignin = async () => {
		try {
			setButtonDisabled(true);
			setLoading(true);
			const req = await axios.post("/api/users/login", user);

			if (req.data.message == "User matched!") {
				router.push("/profile");
				toast.success("User login success");
			}
			if (req.data.message == "Password does not match!") {
				toast.error("User login failed. Please check your credentials");
			}
		} catch (error: any) {
			console.log(error.response.data.error);
			if (error.response.data.error == "User not found!") {
				toast.error("User not found!");
			}
		} finally {
			setButtonDisabled(false);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<>
			<h2 className="text-3xl font-bold py-4">login page</h2>
			<p className="text-xl font-medium py-4">
				Please enter your login details below:
			</p>
			<div className="flex flex-col text-center gap-2 ">
				<div className="flex flex-col text-left gap-1">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={user.email}
						onChange={(event) =>
							setUser({
								...user,
								email: event.target.value,
							})
						}
						placeholder="Enter email here"
						className="px-3 py-2 rounded-md border-2 border-gray-700 active:border-gray-100"
					/>
				</div>
				<div className="flex flex-col text-left gap-1">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={user.password}
						onChange={(event) =>
							setUser({
								...user,
								password: event.target.value,
							})
						}
						placeholder="Enter password here"
						className="px-3 py-2 rounded-md border-2 border-gray-700 active:border-gray-100"
					/>
				</div>
				<button
					onClick={onSignin}
					disabled={isButtonDisabled == false ? false : true}
					className={`bg-blue-500 rounded-md px-3 py-2 text-xl ${
						isButtonDisabled ? "disabled:bg-gray-500" : ""
					}`}
				>
					{isLoading == true ? "Logging In" : "login"}
				</button>

				<p className="py-4">
					Dont have an account?{" "}
					<Link
						className="hover:text-green-500 underline"
						href={"/signup"}
					>
						Click here
					</Link>{" "}
					to signup
				</p>
				<p className="py-4">
					Forgot password?{" "}
					<Link
						className="hover:text-green-500 underline"
						href={"/forgotPassword"}
					>
						Change it here
					</Link>
				</p>
			</div>
		</>
	);
};

export default Login;
