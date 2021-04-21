import React from 'react';
import styled from 'styled-components';

// styling for components
const FormCard = styled.div`
	padding: 2% 5%;
	margin: 5%;
	border-radius: 20px;
	box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
`;
const Label = styled.label`
	margin-bottom: 2%;
`;
const Button = styled.button`
	width: 80px;
`;

// build the main form component
export default function Form(props) {
	const { values, submit, update } = props;

	const handleChange = e => {
		update(e.target.name, e.target.value);
	};

	return (
		<FormCard>
			<form className="form">
				<Label>
					First Name: {`    `}
					<input
						name="first_name"
						id="first_name"
						type="text"
						placeholder="Enter your first name..."
						onChange={handleChange}
						value={values.first_name}
					></input>
				</Label>
				<Label>
					Last Name: {`    `}
					<input
						name="last_name"
						id="last_name"
						type="text"
						placeholder="Enter your last name..."
						onChange={handleChange}
						value={values.last_name}
					></input>
				</Label>

				<Label>
					Email: {`    `}
					<input
						name="email"
						id="email"
						type="text"
						placeholder="Enter your email..."
						onChange={handleChange}
						value={values.email}
					></input>
				</Label>

				<Label>
					Password: {`    `}
					<input
						name="password"
						id="password"
						type="password"
						placeholder="Choose a password..."
						onChange={handleChange}
						value={values.password}
					></input>
				</Label>

				<Label>
					Agree to Terms of Service? {`    `}
					<input name="tos" id="tos" type="checkbox" onChange={handleChange} checked={values.tos}></input>
				</Label>

				<Button type="submit" onClick={submit}>
					SUBMIT
				</Button>
			</form>
		</FormCard>
	);
}
