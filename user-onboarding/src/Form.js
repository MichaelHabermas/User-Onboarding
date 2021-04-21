import React from 'react';
import styled from 'styled-components';

// styling for components
const FormCard = styled.div`
	padding: 2% 5%;
	margin: 5%;
	border-radius: 20px;
	box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);

	label {
		margin-bottom: 2%;
	}

	button {
		width: 80px;
	}

	.err {
		color: red;
		font-size: 15%;
		/* margin-bottom: 10px; */
	}
`;

const Label = styled.label`
	margin-bottom: 2%;
`;
const Button = styled.button`
	width: 80px;
`;
const ErrorDiv = styled.div`
	color: red;
	margin-bottom: 10px;
`;

// build the main form component
export default function Form(props) {
	const { values, submit, disabled, changeHandler, errors } = props;

	return (
		<FormCard>
			{/* <ErrorDiv>
				<div>{errors.first_name}</div>
				<div>{errors.last_name}</div>
				<div>{errors.email}</div>
				<div>{errors.password}</div>
				<div>{errors.tos}</div>
			</ErrorDiv> */}
			<form onSubmit={submit} className="form">
				<div className="err">{errors.first_name}</div>
				<Label>
					First Name: {`    `}
					<input
						name="first_name"
						id="first_name"
						type="text"
						placeholder="Enter your first name..."
						onChange={changeHandler}
						value={values.first_name}
					></input>
				</Label>
				<div className="err">{errors.last_name}</div>
				<Label>
					Last Name: {`    `}
					<input
						name="last_name"
						id="last_name"
						type="text"
						placeholder="Enter your last name..."
						onChange={changeHandler}
						value={values.last_name}
					></input>
				</Label>
				<div className="err">{errors.email}</div>
				<Label>
					Email: {`    `}
					<input
						name="email"
						id="email"
						type="email"
						placeholder="Enter your email..."
						onChange={changeHandler}
						value={values.email}
					></input>
				</Label>
				<div className="err">{errors.password}</div>
				<Label>
					Password: {`    `}
					<input
						name="password"
						id="password"
						type="password"
						placeholder="Choose a password..."
						onChange={changeHandler}
						value={values.password}
					></input>
				</Label>
				<div className="err">{errors.tos}</div>
				<Label>
					Agree to Terms of Service? {`    `}
					<input
						name="tos"
						id="tos"
						type="checkbox"
						// placeholder=""
						onChange={changeHandler}
						checked={values.tos}
					></input>
				</Label>

				<button disabled={disabled}>SUBMIT</button>
			</form>
		</FormCard>
	);
}
