Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

// use the .should assertion
// validates name
describe('User Onboarding App', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3001');
	});

	it('Sanity test to make sure the tests run and work', () => {
		expect(1 + 2).to.equal(3);
		// expect(1 + 2).to.equal(4);
		expect(1 + 2).not.to.equal(4);
	});
});

// 	// Arrange
// 	it('Checks if the first name entered is My Name', function () {
// 		//Act
// 		cy.visit('http://localhost:3001');
// 		// Assert
// 		cy.get('#first-name').should('have.text', '');
// 	});
// });

// // validates email
// describe('Email Validation', function () {
// 	// Arrange
// 	it('Checks if the email entered is correct', function () {
// 		//Act
// 		cy.visit('http://localhost:3001');
// 		// Assert
// 		expect(email).to.equal('habermoose@yahoo.com');
// 	});
// });

// //validates password
// describe('Password Validation', function () {
// 	// Arrange
// 	it('Checks if the password entered is correct', function () {
// 		//Act
// 		cy.visit('http://localhost:3001');
// 		// Assert
// 		expect(password).to.equal('qwertyuiop');
// 	});
// });

// // validates TOS
// describe('TOS Validation', function () {
// 	// Arrange
// 	it('Checks if the TOS is properly checked', function () {
// 		//Act
// 		cy.visit('http://localhost:3001');
// 		// Assert
// 		expect(tos).to.equal('checked');
// 	});
// });

// validates submittable
// describe('Form submission enabled', function () {
// 	// Arrange
// 	it('Checks if the Submit button is functional', function () {
// 		//Act
// 		cy.visit('http://localhost:3001');
// 		// Assert
// 		expect(bubmit button).to.equal('submittable');
// 	});
// });
