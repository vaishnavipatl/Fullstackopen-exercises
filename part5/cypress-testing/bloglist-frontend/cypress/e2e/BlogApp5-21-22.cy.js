// 5.21-22
// Make a test for ensuring that the user who created a blog can delete it.
// Make a test for ensuring that only the creator can see the delete button of a blog, not anyone else.

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
     const userB ={
       name: 'User B',
       email: 'userb@gmail.com',
       password: 'password'
     }
     cy.request('POST', 'http://localhost:3001/api/users/register', userB)
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

 
 