import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form.js';
import UserDisplay from './UserDisplay.js';
import axios from 'axios';

// initial values, and used for resets
const initialFormValues = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	tos: false
};

const fakeData = [
	// for initial testing, will be deprecated once axios requests are up and running
	{
		first_name: 'Harry James',
		last_name: 'Potter Evans Verres',
		email: 'thechosenone@chaoslegion.com',
		password: 'recognitionCode972IAmAPotato',
		tos: true
	},
	{
		first_name: 'Hermione',
		last_name: 'Granger',
		email: 'sparklyUnicornPrincess@sunshineregiment.com',
		password: 'allTheBooks',
		tos: true
	}
];

function App() {
	const [formValues, setFormValues] = useState(initialFormValues); // holds the values in the form as an object

	// holds the list of users from the network API request
	// const [users, setUsers] = useState([]); // ------------- real one
	const [users, setUsers] = useState(fakeData); // ------------- practice one

	// this collects the inputs from the forms as they are entered, and prepares then for the submission process
	const updateForm = (inputName, inputValue) => {
		setFormValues({ ...formValues, [inputName]: inputValue });
	};

	const submitValues = e => {
		e.preventDefault();
		const newUser = {
			first_name: formValues.first_name.trim(),
			last_name: formValues.last_name.trim(),
			email: formValues.email.trim(),
			password: formValues.password.trim(),
			tos: formValues.first_name
		};
		setUsers([...users, newUser]);
		setFormValues(initialFormValues); // will need and uncomment later
	};

	// useEffect(() => {
	// 	axios
	// 		.get('https://reqres.in/api/users')
	// 		.then(res => {
	// 			// console.log(res.data.data);
	// 			setUsers(res.data.data);
	// 			// setFormValues(initialFormValues); // will need and uncomment later
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// }, []);

	if (users.length === 0) return <h3>Loading Data, Chillaz...</h3>;

	return (
		<>
			<h1>Title</h1>
			<Form values={formValues} submit={submitValues} update={updateForm} />

			<h2>Users Display</h2>
			{users.map((user, idx) => {
				return <UserDisplay key={idx} user={user} />;
			})}
		</>
	);
}

export default App;
