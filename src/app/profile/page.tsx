"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

let Profile = () => {
	const router = useRouter();
	let [data, setData] = useState("");

	let onLogout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logout success!");
			router.push("/");
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		async function getUserDetails() {
			const res = await axios.get("/api/users/me");

			console.log(res.data);

			setData(res.data.user._id);
		}
		getUserDetails();
	}, [data]);

	return (
		<>
			<h2>Main page</h2>{" "}
			{data == "" ? (
				"Please login first!"
			) : (
				<>
					<Link href={`/profile/${data}`}> {data} </Link>
				</>
			)}{" "}
			<button onClick={onLogout} className={`bg-blue-500 px-3 py-2 text-xl`}>
				Logout
			</button>
		</>
	);
};

export default Profile;
