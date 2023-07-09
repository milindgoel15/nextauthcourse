import React from "react";

let UserProfile = ({ params }: any) => {
	return (
		<>
			<h2>User profile page</h2>
			<p> {params.id} </p>
		</>
	);
};

export default UserProfile;
