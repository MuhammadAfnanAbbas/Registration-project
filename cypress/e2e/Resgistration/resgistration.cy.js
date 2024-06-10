describe('Bulk Signup Test', () => {
    before(() => {
        // Handle uncaught exceptions to prevent tests from failing
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        
        // Reset browser storage and set viewport
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
        // Override webdriver detection
        cy.on('window:before:load', (win) => {
            Object.defineProperty(win.navigator, 'webdriver', {
                get: () => false,
            });
        });
    });

    const signupCommands = require('../../fixtures/Signupcommands.json');
    const users = require('../../fixtures/users.json');

    // Iterate through users and signup commands to run tests
    users.forEach(user => {
        Object.keys(signupCommands).forEach(siteUrl => {
            const commandName = signupCommands[siteUrl];
            it(`Signup at ${siteUrl} for user ${user.email}`, () => {
                cy[commandName](user);
            });
        });
    });
});