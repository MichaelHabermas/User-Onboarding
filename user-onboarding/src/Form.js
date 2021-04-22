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
	}
`;

// build the main form component
export default function Form(props) {
	const { values, submit, disabled, changeHandler, errors } = props;

	return (
		<FormCard>
			<form onSubmit={submit} className="form">
				<div className="err">{errors.first_name}</div>
				<label>
					First Name: {`    `}
					<input
						name="first_name"
						id="first_name"
						type="text"
						placeholder="Enter your first name..."
						onChange={changeHandler}
						value={values.first_name}
					></input>
				</label>
				<div className="err">{errors.last_name}</div>
				<label>
					Last Name: {`    `}
					<input
						name="last_name"
						id="last_name"
						type="text"
						placeholder="Enter your last name..."
						onChange={changeHandler}
						value={values.last_name}
					></input>
				</label>
				<div className="err">{errors.email}</div>
				<label>
					Email: {`    `}
					<input
						name="email"
						id="email"
						type="email"
						placeholder="Enter your email..."
						onChange={changeHandler}
						value={values.email}
					></input>
				</label>
				<div className="err">{errors.password}</div>
				<label>
					Password: {`    `}
					<input
						name="password"
						id="password"
						type="password"
						placeholder="Choose a password..."
						onChange={changeHandler}
						value={values.password}
					></input>
				</label>
				<div className="err">{errors.tos}</div>
				<label>
					Agree to Terms of Service? {`    `}
					<input
						name="tos"
						id="tos"
						type="checkbox"
						// placeholder=""
						onChange={changeHandler}
						checked={values.tos}
					></input>
				</label>

				<button id="submitBtn" disabled={disabled}>
					SUBMIT
				</button>
			</form>
		</FormCard>
	);
}
