Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

// use the .should assertion
// validates name
describe('User Onboarding App', () => {
	// DRY helpers
	const firstNameInput = () => cy.get('input[name="first_name"]');
	const lastNameInput = () => cy.get('#last_name');
	const emailInput = () => cy.get('input[name="email"]');
	const passwordInput = () => cy.get('input[name="password"]');
	const tosCheckbox = () => cy.get('input[name="tos"]');
	const submitBtn = () => cy.get('#submitBtn');

	beforeEach(() => {
		cy.visit('http://localhost:3001');
	});

	// TEST 1
	it('Sanity test to make sure the tests run and work', () => {
		expect(1 + 2).to.equal(3);
		// expect(1 + 2).to.equal(4);
		expect(1 + 2).not.to.equal(4);
	});

	// TEST 2
	it('Check input existences', () => {
		firstNameInput().should('exist');
		lastNameInput().should('exist');
		emailInput().should('exist');
		passwordInput().should('exist');
		tosCheckbox().should('exist');
		submitBtn().should('exist');
	});

	// TEST 3: fill in fields
	it('Fill in text fields and test', () => {
		firstNameInput().should('have.value', '').type('Michael').should('have.value', 'Michael');
		lastNameInput().should('have.value', '').type('Habermas').should('have.value', 'Habermas');
		emailInput().should('have.value', '').type('habermoose@aol.com').should('have.value', 'habermoose@aol.com');
		passwordInput().should('have.value', '').type('qwertyuiop').should('have.value', 'qwertyuiop');
		tosCheckbox().click().should('have.value', 'on');
		submitBtn().to.be('enabled').click();
		cy.contains('habermoose@aol.com').should('exist');
	});
});
