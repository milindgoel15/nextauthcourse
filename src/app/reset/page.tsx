"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

let ResetPage = () => {
	let [password, setPassword] = useState("");
	let [token, setToken] = useState("");
	let [isNewPassword, setNewPassword] = useState(false);
	let [error, setError] = useState(false);

	useEffect(() => {
		const urlToken = window.location.search.split("=")[1];

		setToken(urlToken);
	}, []);
	let resetPassword = async () => {
		try {
			if (token != null && token.length > 0) {
				await axios.post("/api/users/reset", { token, password });

				setNewPassword(true);

				toast.success("Password changed successfully");
				setPassword("");
			}
		} catch (error: any) {
			console.log(error);
			setError(error);
		}
	};

	return (
		<>
			<h2 className="text-3xl py-5">Input your new password</h2>
			<div className="flex flex-col gap-1 my-5">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder="Enter password here"
					className="px-3 py-2 rounded-md border-2 border-gray-700 active:border-gray-100"
				/>
			</div>
			<button
				onClick={resetPassword}
				disabled={password == "" ? true : false}
				className={`bg-blue-500 rounded-md px-3 py-2 text-xl ${
					password == "" ? "disabled:bg-gray-500" : ""
				}`}
			>
				Reset
			</button>
			{isNewPassword && (
				<p className="py-3">
					Password changed successfully!{" "}
					<Link className="hover:text-green-500 underline" href={"/login"}>
						Click here
					</Link>{" "}
					to login{" "}
				</p>
			)}
		</>
	);
};

export default ResetPage;
