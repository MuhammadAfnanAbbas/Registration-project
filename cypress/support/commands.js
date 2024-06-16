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
    cy.get('input#first-name').type(user.firstname);
    cy.get('input#last-name').type(user.lastname);
    cy.get('input#email').type(user.email);
    cy.get('input#new-password').type(user.password);
    cy.get('input#password-check').type(user.password);
    cy.get('#mobile-prefix', { timeout: 10000 })
      .should('be.visible')
      .then((select) => {
        cy.wrap(select)
          .find('option[value="+1"][data-country="US"]')
          .then(option => {
            if (option.length) {
              option.prop('selected', true);
              cy.wrap(select).trigger('change');
            } else {
              cy.log('Option +1 US not found'); 
            }
          });
      });
    cy.get('#mobile').type(user.number, { force: true });
    //cy.get('button#submit-signup-form').click(); Join button is disabled for now - in testing
    cy.get('input#privacy-policy').check({force:true})
    cy.wait(5000)
})

Cypress.Commands.add('SignupatHilton', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.hilton.com/en/hilton-honors/join/', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.reload()
    cy.wait(2000)
    cy.get('input[name = "name.firstName"]').type(user.firstname);
    cy.get('input[name = "name.lastName"]').type(user.lastname);
    cy.get('input#email').type(user.email);
    cy.get('.flex > input.form-input[name="phone.phoneNumber"]').eq(1).type(user.number);
    cy.get('input[name="email.emailAddress"]').type(user.password);
    cy.get('input[name="address.addressLine1"]').type(user.address1);
    //cy.get('button#submit-signup-form').click(); Join button is disabled for now - in testing
    cy.get('input[name="address.postalCode"]').type(user.zipCode)
    cy.get('input[name="password"]').type(user.password)
    cy.get('input[name="password"]').type(user.password)
    cy.wait(5000)
})

Cypress.Commands.add('SignupatMarriottBonvoy', (user) => {
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
    cy.get('#field-first-name').type(user.firstname);
    cy.get('#field-last-name').type(user.lastname);
    cy.get('#field-email').type(user.email);
    cy.get('#field-postal').type(user.zipCode)
    cy.get('#field-password').type(user.password)
    cy.get('#field-password-confirmation').type(user.password)
    //cy.get('.js-submit-button').click() - submit button
    cy.wait(5000)
})
Cypress.Commands.add('SignupatWyndhamRewards', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.wyndhamhotels.com/wyndham-rewards/join', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.reload()
    cy.wait(2000)
    const fullNumber = `1${user.number}`;  // Add '+1' before the number
    cy.get('input[name="firstName"]').type(user.firstname, {force:true});
    cy.get('input[name="lastName"]').type(user.lastname, {force:true});
    cy.get('#country0').select('US', { force: true });
    cy.get('input#emailAddress').type(user.email, {force:true});
    cy.get('input#phoneNumber0').type(fullNumber, {force:true})
    cy.get('input#zipCode0').type(user.zipCode), {force:true}
    cy.get('input#password').type(user.password, {force:true})
    cy.get('input#confirmPassword').type(user.password, {force:true})
    //cy.get('button.submit').click({force:true}) - submit button
    cy.wait(5000)
})

Cypress.Commands.add('SignupatSonesta', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.sonesta.com/join-travel-pass', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.reload()
    cy.wait(2000)
    const fullNumber = `1${user.number}`;  // Add '+1' before the number
    cy.get('input#email').type(user.email);
    cy.get('input#firstname').type(user.firstname);
    cy.get('input#lastname').type(user.lastname);
    cy.get('#submit-enrollment-form').click() //submit button.
    cy.wait(5000)
})
Cypress.Commands.add('SignupatMovieBowl', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.moviebowlgrille.com/loyalty-sign-up', {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
          },
        failOnStatusCode: false
    });
    //cy.reload()
    cy.wait(2000)
    cy.get('#InputModel_Email').type(user.email)
    cy.get('#InputModel_FirstName').type(user.firstname);
    cy.get('#InputModel_LastName').type(user.lastname);
    cy.get('#InputModel_Address1').type(user.address1);
    cy.get('#InputModel_City').type(user.city);
    cy.get('#InputModel_State').type(user.state);
    cy.get('#InputModel_ZipCode').type(user.zipCode)
    cy.get('#InputModel_Password').type(user.password);
    cy.get('#InputModel_ConfirmPassword').type(user.password);
    //cy.get('#signup-submit').click(); // disabled in testing
    cy.wait(5000)
})
Cypress.Commands.add('SignupatStrarlight', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    function convertDate(inputDate) {
        const [month, day, year] = inputDate.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.starlightcinemas.com', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.wait(5000)
    const dateInput = user.dob;
    const formattedDate = convertDate(dateInput);
    cy.get('div[aria-label="loyalty access"][role="button"]').eq(1).click({force:true});
    cy.get('.css-b56dch').click()
    cy.wait(1000);
    cy.get('.css-g2ptcc').click();
    cy.wait(5000);
    cy.get('input#V2Vic2l0ZU1hbmFnZXJXaWRnZXQ6NWNiZTA4MzEtNmZmYy00NGU1LWJlZTktYWQ2NzI0ZDM0ODlj-loyalty-firstname').type(user.firstname);
    cy.get('input#V2Vic2l0ZU1hbmFnZXJXaWRnZXQ6NWNiZTA4MzEtNmZmYy00NGU1LWJlZTktYWQ2NzI0ZDM0ODlj-loyalty-lastname').type(user.lastname);
    cy.get('input#V2Vic2l0ZU1hbmFnZXJXaWRnZXQ6NWNiZTA4MzEtNmZmYy00NGU1LWJlZTktYWQ2NzI0ZDM0ODlj-loyalty-date-of-birth').type(formattedDate);
    cy.get('input#V2Vic2l0ZU1hbmFnZXJXaWRnZXQ6NWNiZTA4MzEtNmZmYy00NGU1LWJlZTktYWQ2NzI0ZDM0ODlj-loyalty-email').type(user.email);
    cy.get('input#V2Vic2l0ZU1hbmFnZXJXaWRnZXQ6NWNiZTA4MzEtNmZmYy00NGU1LWJlZTktYWQ2NzI0ZDM0ODlj-loyalty-phone-number').type(user.number);
    cy.get('input#V2Vic2l0ZU1hbmFnZXJXaWRnZXQ6NWNiZTA4MzEtNmZmYy00NGU1LWJlZTktYWQ2NzI0ZDM0ODlj-loyalty-password').type(user.password);
    cy.get('input#V2Vic2l0ZU1hbmFnZXJXaWRnZXQ6NWNiZTA4MzEtNmZmYy00NGU1LWJlZTktYWQ2NzI0ZDM0ODlj-loyalty-confirm-password').type(user.password);
    cy.get(':nth-child(2) > .css-1i379za > .css-7e8jed').click();
    //cy.get('.css-1d1sq21').click() //disable in testing
    cy.wait(5000)
})

Cypress.Commands.add('SignupatMcdonalds', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.mcdonalds.com/us/en-us/mcdonalds-email-signup.html', {
        headers: {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        },
        failOnStatusCode: false
    });
    cy.wait(5000)
    cy.get('input[id="txt-form-text-12661466"]').type(user.email)
    cy.wait(2000);
    cy.get('input[id="txt-form-text-554068101"]').type(user.zipCode)
    cy.wait(5000)
    //cy.get('button[data-submit="Sign Up"]').click() submit button commented out
    cy.wait(5000);
})