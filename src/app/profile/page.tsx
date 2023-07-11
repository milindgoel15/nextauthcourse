"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

let Profile = () => {
	const router = useRouter();
	let [data, setData] = useState({
		username: "",
		email: "",
	});

	let onLogout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logout success!");
			router.push("/login");
		} catch (error: any) {
			console.log(error.data.response.data.error);
		}
	};

	useEffect(() => {
		async function getUserDetails() {
			try {
				const res = await axios.get("/api/users/me");

				if (res.data.message == "Got user details") {
					setData({
						email: res.data.user.email,
						username: res.data.user.username,
					});
				}
			} catch (error: any) {
				if (error.response.data.error == "jwt must be provided") {
					toast.error("Please login first");
					router.refresh();
				}
				if (error.response.data.error == "User not found!") {
					setData({
						email: "",
						username: "",
					});
				}
			}
		}
		getUserDetails();
	}, []);

	return (
		<>
			<h2 className="text-4xl py-6">Main profile page</h2>{" "}
			{data.email == "" ? (
				"Please login first!"
			) : (
				<>
					<div className="py-10">
						<p>Username: {data.username}</p>
						<p>Email: {data.email}</p>
					</div>
				</>
			)}
			<button
				onClick={onLogout}
				className={`bg-blue-500 rounded-md px-3 py-2 text-xl`}
			>
				Logout
			</button>
		</>
	);
};

export default Profile;
