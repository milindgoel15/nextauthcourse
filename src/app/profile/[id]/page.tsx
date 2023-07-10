"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

let UserProfile = ({ params }: any) => {
	const router = useRouter();

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

	return (
		<>
			<h2>User profile page</h2>
			<p> {params.id} </p>

			<button onClick={onLogout} className={`bg-blue-500 px-3 py-2 text-xl`}>
				Logout
			</button>
		</>
	);
};

export default UserProfile;
