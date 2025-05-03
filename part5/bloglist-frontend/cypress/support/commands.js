import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:5173');
    cy.contains('Login').click()
    cy.get('#Email').type(email);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
    cy.contains('User logged in Sucessfully')
})

Cypress.Commands.add('createBlog' , ({title, content ,image})=>{
    cy.contains('New Blog').click()
    cy.get('#title').type(title)
    cy.get('#content').type(content)
    cy.get('#image').attachFile(image)
    cy.get('#postblog').click()
})
