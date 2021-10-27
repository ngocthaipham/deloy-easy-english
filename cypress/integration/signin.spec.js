/* eslint-disable no-undef */
// signin.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("test sign in", function () {
  it("Sign in on easy english", function () {
    cy.viewport(1920, 1080)
    cy.visit("https://deploy-easy-english.herokuapp.com/")
    cy.get('a[href="/my-course"]').click()
    cy.get('input[type="text"]').type("marbiosgod")
    cy.get('input[type="password"]').type("123456")
    cy.get('button[type="submit"]').click()    
  });
});
