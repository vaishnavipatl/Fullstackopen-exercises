
// describe('Frontend availability', () => {
//   it('should load the frontend homepage', () => {
//     cy.visit('http://localhost:5173');
//   });
// });

// 5.18: Blog List End To End Testing, step 2
// Make tests for logging in. 
// Test both successful and unsuccessful login attempts. 
// Make a new user in the beforeEach block for the tests.
describe('backend database availability', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/testing/reset');

    cy.request('POST', 'http://localhost:3001/api/users/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('should load the frontend homepage', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Login')
  });

  describe('Login', ()=>{
    beforeEach(()=>{
      cy.visit('http://localhost:5173')
      cy.contains('Login').click()
  })
    it('succeeds with credentials' ,()=>{
      cy.get('#Email').type('test@example.com')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()
      cy.contains('User logged in Sucessfully')
    })

    it('fails with wrong credentials' ,()=>{
      cy.get('#Email').type('test@example.com')
      cy.get('#password').type('password1234')
      cy.get('#login-button').click()
      cy.contains('Incorrect password')
    })
  })

  describe('only creator can delete button', function(){
   it('creator can delete the blog ' ,()=>{
    cy.login('test@example.com' ,'password123')
    cy.createBlog({
      title :'Blog title 2',
      content :'Blog Content2',
      image :'download.jpg',
    })
    cy.contains('Blog title 2').parent().contains('Delete').click()
    cy.wait(5000)
    cy.contains('Blog title 2').should('not.exist')
   })

   it('other canot see delete button',()=>{
    // const userB ={
    //   name: 'User B',
    //   email: 'userb@gmail.com',
    //   password: 'password'
    // }
    // cy.request('POST', 'http://localhost:3001/api/users/register', userB)
    cy.login('test@example.com' ,'password123')
    cy.createBlog({
      title :'Blog title 3',
      content :'Blog Content 3',
      image :'download.jpg',
    })
    cy.contains('Logout').click()

    cy.login('userb@gmail.com' ,'password')
    cy.contains('Blog title 3')  //.parent().contains('View More').click()
    cy.contains('Delete').should('not.exist')
   })
  }) 
});

