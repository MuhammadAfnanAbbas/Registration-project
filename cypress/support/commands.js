// Cypress.Commands.add('SignupatHayat', (user) => {
//     cy.visit('https://www.hyatt.com/en-US/member/enroll', {
//         headers: {
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
//             "Referer": "https://www.hyatt.com"
//         },
//         failOnStatusCode: false
//     });
//     cy.wait(2000)
//     cy.get('#input[name="firstName"]').type(user.firstname);
//     cy.get('#input[name="lastName"]').type(user.lastname);
//     cy.get('#input[name="email"]').type(user.email);
//     cy.get('#input[type="password"]').type(user.password);
//     cy.get('button.submit-btn').click();
//     cy.wait(5000)
// });
// Cypress.Commands.add('SignupatChoice', (user) => {
//     cy.visit('https://www.hyatt.com/en-US/member/enroll');
//     cy.get('#input[name="firstName"]').type(user.firstname);
//     cy.get('#input[name="lastName"]').type(user.lastname);
//     cy.get('#input[name="email"]').type(user.email);
//     cy.get('#input[type="password"]').type(user.password);
//     cy.get('button.submit-btn').click();
//     cy.wait(5000)
// });
import 'cypress-wait-until';

Cypress.Commands.add('SignupatIhg', (user) => {
    cy.visit('http://www.ihg.com/rewardsclub/gb/en/enrollment/join', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.get('input#firstName').type(user.firstname);
    cy.get('input#lastName').type(user.lastname);
    cy.get('input#email').type(user.email);
    cy.get('input#confirmEmail').type(user.email);
    cy.get('input#password').type(user.password);
    cy.get('input#confirmPassword').type(user.password);
    cy.waitUntil(() => cy.get('#country').find('option').then(options => options.length > 1), {
        errorMsg: 'Expected to find more than one option in the country dropdown',
        timeout: 10000, // waits up to 10 seconds
        interval: 500 // checks every 500 ms
    });
    cy.get('#country').select('US').then(()=>{
        cy.get('#address1').type(user.address1);
        if (user.address2) {
        cy.get('#address2').type(user.address2);
        }
        cy.get('#city').type(user.city);
        cy.get('#stateList').select(user.state)
        cy.get('#zipCode').type(user.zipCode);
        cy.get('.filterCheckboxRect').click({multiple:true})
        //cy.get('form').contains('Join Now').click(); Join button is disabled for now - in testing
        cy.wait(5000)
    })
});

Cypress.Commands.add('SignupatStarwood', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.marriott.com/loyalty/createAccount/createAccountPage1.mi', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.reload()
    cy.wait(2000)
    cy.get('input#field-first-name').type(user.firstname);
    cy.get('input#field-last-name').type(user.lastname);
    cy.get('input#field-postal').type(user.zipCode)
    cy.get('input#field-email').type(user.email);
    cy.get('input#field-password').type(user.password);
    cy.get('input#field-password-confirmation').type(user.password);
    //cy.get('button#enroll-join').click(); Join button is disabled for now - in testing
    cy.wait(5000)
    //cy.url().should('eq', 'https://www.marriott.com/loyalty/myAccount/profile.mi') commented out because in testing
})

Cypress.Commands.add('SignupatOmni', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://bookings.omnihotels.com/loyalty/signup', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.reload()
    cy.wait(2000)
    // cy.get('input#field-first-name').type(user.firstname);
    // cy.get('input#field-last-name').type(user.lastname);
    // cy.get('input#field-postal').type(user.zipCode)
    // cy.get('input#field-email').type(user.email);
    // cy.get('input#field-password').type(user.password);
    // cy.get('input#field-password-confirmation').type(user.password);
    //cy.get('button#enroll-join').click(); Join button is disabled for now - in testing
    cy.wait(5000)
    //cy.url().should('eq', 'https://www.marriott.com/loyalty/myAccount/profile.mi') commented out because in testing
})