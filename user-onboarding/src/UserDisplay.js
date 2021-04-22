import React from 'react';
import styled from 'styled-components';

// styling for user info display
const UserCard = styled.div`
	margin: 5%;
	padding: 5%;
	border-radius: 20px;
	box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
`;

export default function UserDisplay(props) {
	const { first_name, last_name, email, tos } = props.user;

	return (
		<UserCard>
			<h3>
				{last_name}, {first_name}
			</h3>
			<p>Email: {email}</p>
			<p>TOS Agreed to? {tos ? 'Yes' : 'No'}</p>
		</UserCard>
	);
}
