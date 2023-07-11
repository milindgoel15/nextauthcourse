"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

let SignUp = () => {
	const router = useRouter();

	let [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	let [isButtonDisabled, setButtonDisabled] = useState(false);
	let [isLoading, setLoading] = useState(false);

	let onSignup = async () => {
		try {
			setButtonDisabled(true);
			setLoading(true);

			const req = await axios.post("/api/users/signup", user);

			if (req.data.message == "User added!") {
				toast.success(
					"User registered successfully. Please verify before logging in."
				);
				router.push("/login");
			}
		} catch (error: any) {
			console.log(error.response.data.error);
			if (error.response.data.error == "User already exists") {
				toast.error("User already exists!");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			user.username.length > 0 &&
			user.email.length > 0 &&
			user.password.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<>
			<h2 className="text-3xl font-bold py-4">SignUp page</h2>
			<p className="text-xl font-medium py-4">
				Please enter your SignUp details below:
			</p>
			<div className="flex flex-col gap-2 ">
				<div className="flex flex-col gap-1">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						value={user.username}
						onChange={(event) =>
							setUser({
								...user,
								username: event.target.value,
							})
						}
						placeholder="Enter username here"
						className="px-3 py-2 rounded-md border-2 border-gray-700 active:border-gray-100"
					/>
				</div>
				<div className="flex flex-col gap-1">
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
				<div className="flex flex-col gap-1">
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
					onClick={onSignup}
					disabled={isButtonDisabled == false ? false : true}
					className={`bg-blue-500 rounded-md px-3 py-2 text-xl ${
						isButtonDisabled ? "disabled:bg-gray-500" : ""
					}`}
				>
					{isLoading == true ? "Signing up" : "Signup"}
				</button>
				<p className="py-4">
					Already have an account?{" "}
					<Link className="hover:text-green-500 underline" href={"/login"}>
						Click here
					</Link>{" "}
					to login
				</p>
			</div>
		</>
	);
};

export default SignUp;
