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
	email: yup.string().email('Please enter a valid email'),
	password: yup.string().required('Please choose a valid password').min(8, 'Password must be 8 characters minimum'),
	tos: yup.boolean().oneOf([true], 'You must agree to the Terms of Service to continue')
}); // creates the testing criteria and error messages for the form entry fields

function App() {
	const [formValues, setFormValues] = useState(initialFormValues); // holds the values in the form as an object
	const [disabled, setDisabled] = useState(true); // determines if the submit button is useable
	const [users, setUsers] = useState([]); //  holds the list of users from the network API request
	const [errors, setErrors] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		tos: false
	}); // for the error messages to be displayed as form entry data does not meet yup criteria

	// checks for errors and displays them if conditions are not met
	const setFormErrors = (name, value) => {
		yup.reach(schema, name)
			.validate(value)
			.then(() => {
				setErrors({ ...errors, [name]: '' }); // if conditions are met replaces an error message with an empty string
			})
			.catch(err => {
				setErrors({ ...errors, [name]: err.errors[0] }); // this is just the way it needs to be. See Month 2 Week 2 Day 3 Lambda
			});
	};

	// this collects the inputs from the forms as they are entered, and prepares then for the submission process
	const changeHandler = e => {
		const { name, type, value, checked } = e.target;
		const updatedInfo = type === 'checkbox' ? checked : value;
		setFormErrors(name, updatedInfo);
		setFormValues({ ...formValues, [name]: updatedInfo });
	};

	// checks to see if all fields are valid so it mat enable the submit button
	useEffect(() => {
		schema.isValid(formValues).then(valid => setDisabled(!valid));
	}, [formValues]);

	// submit functionality
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
				axios
					.get('https://reqres.in/api/users')
					.then(res => {
						// setUsers(res.data.data);  // what I would use if the POST request was real
						// setUsers([...users, newUser]);
						setUsers([...res.data.data, newUser]); // useful in this instance, for demo purposes
						setFormValues(initialFormValues); // clears the form values
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log(err);
			});
	};

	// the initial data retrieve and display
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

	// buys time for the get request to finish
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
