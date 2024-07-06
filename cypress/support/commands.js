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
        cy.get('form').contains('Join Now').click(); //Join button is disabled for now - in testing
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
    cy.get('button#enroll-join').click() //Join button is disabled for now - in testing
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
    cy.get('button#submit-signup-form').click(); //Join button is disabled for now - in testing
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
    cy.get('input[name="address.postalCode"]').type(user.zipCode)
    cy.get('input[name="password"]').type(user.password)
    cy.get('input[name="password"]').type(user.password)
    cy.get('.btn-primary').click() //for join
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
    cy.get('.js-submit-button').click() //- submit button
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
    cy.get('button.submit').click({force:true}) //- submit button
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
    cy.get('#signup-submit').click(); // disabled in testing signup
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
    cy.get('.css-1d1sq21').click() //disable in testing
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
    cy.get('button[data-submit="Sign Up"]').click() //submit button commented out
    cy.wait(5000);
})

Cypress.Commands.add('SignupatMacys', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.macys.com/account/createaccount?cm_sp=my_account-_-sign_in-_-create_account', {
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
    const dob = user.dob;
    const [month, day, year] = dob.split('/');
    cy.wait(5000)
    cy.get('input#ca-profile-firstname').type(user.firstname);
    cy.wait(2000);
    cy.get('input#ca-profile-lastname').type(user.lastname)
    cy.wait(2000);
    cy.get('input#ca-profile-email').type(user.email)
    cy.wait(2000);
    cy.get('input#ca-profile-password').type(user.password)
    cy.wait(2000);
    cy.get('#ca-profile-birth-month').select(month);

    // Set the birth day
    cy.get('#ca-profile-birth-day').select(day.padStart(2, '0')); // Ensures the day is two digits
    cy.get('input#ca-profile-star-rewards').check();
    cy.wait(3000);
    cy.get('#ca-profile-star-rewards-phone').type(user.number)
    cy.get('#ca-profile-submit').click() //for submit
    cy.wait(5000);
})


Cypress.Commands.add('SignupatShien', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://us.shein.com/user/auth/login?direction=navt', {
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
    cy.get('input.sui-input__inner[aria-label="Email Address:"]').type(user.email)
    cy.get('button.page__login_mainButton').click();
    cy.wait(4000);
    cy.get('.main-content >.page__login-newUI-input >.input_filed-text >.sui-input >input.sui-input__inner[type="password"]').type(user.password)
    cy.wait(2000);
    cy.get('p[data-scene="1"] .sui-checkbox__origin-input').check({force:true});
    cy.get('.actions> .login-point_button >.page__login_mainButton').eq(2).click() //For submission
    cy.wait(5000);
    //cy.get('.skip > span').click() for skipping the phone number step
    cy.wait(5000);
})


Cypress.Commands.add('SignupatFashionovaa', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.fashionnova.com/', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.wait(8000)
    cy.get('.recommendation-modal__close-button').click()
    cy.wait(2000);
    cy.get('li > .account__link').click()
    cy.wait(2000);
    cy.get('input#RegisterForm-email').type(user.email)
    cy.wait(2000);
    cy.get('.continue-button').click();
    cy.wait(2000);
    cy.get('input#RegisterForm-FirstName').type(user.firstname)
    cy.wait(2000);
    cy.get('input#RegisterForm-LastName').type(user.lastname)
    cy.wait(2000);
    cy.get('input#sign-up-password').type(user.password)
    cy.wait(2000);
    cy.get('#sign-up-form-submit-button').click() //for submit
    cy.wait(5000);
})

Cypress.Commands.add('SignupatBurgerKing', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://burgerking.com', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.wait(8000)
    //cy.get('.save-preference-btn-handler').click();
    //cy.wait(2000);
    cy.get('[data-testid="mobile-nav-signup-link"] > .r-1awozwy > .css-175oi2r > .css-146c3p1').click()
    cy.wait(2000);
    //cy.get('.save-preference-btn-handler').click();
    cy.wait(1000);
    cy.get('[data-testid="signin-email-input"]').type(user.email)
    cy.get('[data-testid="signin-button"]').click();
    cy.wait(5000);
    cy.get('[data-testid="signup-name-input"]').type(user.firstname)
    cy.wait(2000);
    cy.get('[data-testid="signup-agreeToTermsOfService"] > .css-175oi2r').click()
    cy.wait(2000);
    cy.get('[data-testid="signup-button"]').click() //for submit
    cy.wait(5000);
})

Cypress.Commands.add('SignupatJustServe', (user) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    // Reset browser storage and set viewport
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit('https://www.justserve.org/register', {
        headers: {
            'accept': 'application/json, text/plain, */*, text/html',
            'user-agent': 'axios/0.27.2'
        },
        failOnStatusCode: false
    });
    cy.wait(8000)
    cy.get('#js-textbox-firstName').type(user.firstname);
    cy.get('[data-test="lastName"]').type(user.lastname);
    cy.get('#js-textbox-postalCode').type(user.zipCode);
    cy.get('#js-textbox-email').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('#js-textbox-confirmPassword').type(user.password);
    cy.get('[data-test="country"]').click();
    cy.contains('li', user.country).scrollIntoView().click();
    cy.get('#js-textbox-country').should('contain', user.country);
    cy.get('[data-test="createAccountButton"]').click() //for submit
    cy.wait(5000);
})