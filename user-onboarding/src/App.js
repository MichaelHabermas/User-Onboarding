import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form.js';
import UserDisplay from './UserDisplay.js';
import axios from 'axios';
import * as yup from 'yup';

// initial values, and used for resets
const initialFormValues = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	tos: false
};

// const fakeData = [
// 	// for initial testing, will be deprecated once axios requests are up and running
// 	{
// 		first_name: 'Harry James',
// 		last_name: 'Potter Evans Verres',
// 		email: 'thechosenone@chaoslegion.com',
// 		password: 'recognitionCode972IAmAPotato',
// 		tos: false
// 	},
// 	{
// 		first_name: 'Hermione',
// 		last_name: 'Granger',
// 		email: 'sparklyUnicornPrincess@sunshineregiment.com',
// 		password: 'allTheBooks',
// 		tos: true
// 	}
// ];

const schema = yup.object().shape({
	first_name: yup.string().required('Please enter your first name').min(3, 'Name needs to be 3 characters minimum'),
	last_name: yup.string().required('Please enter your last name').min(2, 'Name needs to be 2 characters minimum'),
	email: yup.string().required('Please enter a valid email').min(8, 'Email needs to be 8 characters minimum'),
	password: yup.string().required('Please choose a valid password').min(8, 'Password must be 8 characters minimum'),
	tos: yup.boolean().oneOf([true], 'You must agree to the Terms of Service to continue')
});

function App() {
	const [formValues, setFormValues] = useState(initialFormValues); // holds the values in the form as an object
	const [disabled, setDisabled] = useState(true); // determines if the submit button is useable
	// -------- holds the list of users from the network API request
	const [users, setUsers] = useState([]); // ------------- real one
	// const [users, setUsers] = useState(fakeData); // ------------- practice one
	const [errors, setErrors] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		tos: false
	});

	const setFormErrors = (name, value) => {
		yup.reach(schema, name)
			.validate(value)
			.then(() => {
				setErrors({ ...errors, [name]: '' });
			})
			.catch(err => {
				setErrors({ ...errors, [name]: err.errors[0] });
			});
	};

	// this collects the inputs from the forms as they are entered, and prepares then for the submission process
	const changeHandler = e => {
		const { name, type, value, checked } = e.target;
		const updatedInfo = type === 'checkbox' ? checked : value;
		setFormErrors(name, updatedInfo);
		setFormValues({ ...formValues, [name]: updatedInfo });
	};

	useEffect(() => {
		schema.isValid(formValues).then(valid => setDisabled(!valid));
	}, [formValues]);

	const submitValues = e => {
		e.preventDefault();
		const newUser = {
			first_name: formValues.first_name.trim(),
			last_name: formValues.last_name.trim(),
			email: formValues.email.trim(),
			password: formValues.password.trim(),
			tos: formValues.first_name
		};
		axios
			.post('https://reqres.in/api/users', newUser)
			.then(res => {
				// setUsers([...users, newUser]);
				console.log(res);
				setFormValues(initialFormValues); // may go somewhere else later
				axios
					.get('https://reqres.in/api/users')
					.then(res => {
						setUsers(res.data.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get('https://reqres.in/api/users')
			.then(res => {
				setUsers(res.data.data);
				console.log(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	if (users.length === 0) return <h3>Loading Data, Chillaz...</h3>;

	return (
		<>
			<h1>Title</h1>
			<Form
				values={formValues}
				submit={submitValues}
				changeHandler={changeHandler}
				disabled={disabled}
				errors={errors}
			/>

			<h2>Users Display</h2>
			{users.map((user, idx) => {
				return <UserDisplay key={idx} user={user} />;
			})}
		</>
	);
}

export default App;
