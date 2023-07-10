"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

let VerifyEmail = () => {
	let [token, setToken] = useState("");
	let [isVerified, setVerified] = useState(false);
	let [error, setError] = useState(false);

	useEffect(() => {
		const urlToken = window.location.search.split("=")[1];

		setToken(urlToken);
	}, []);

	useEffect(() => {
		let sendVerificationEmail = async () => {
			try {
				await axios.post("/api/users/verifyEmail", { token });

				setVerified(true);
			} catch (error: any) {
				console.log(error);
				setError(error);
			}
		};

		if (token != null && token.length > 0) {
			sendVerificationEmail();
		}
	}, [token]);

	return (
		<>
			{token ? <p>Your token: {token} </p> : "No token"}

			{isVerified && (
				<>
					<p>Verified</p>
					<Link href={"/login"}>Click to go to login page</Link>
				</>
			)}
			{error && (
				<>
					<p>{error}</p>
					<p>Please try again</p>
				</>
			)}
		</>
	);
};

export default VerifyEmail;
