// 5.19: Blog List End To End Testing, step 3
// Make a test that verifies a logged-in user can create a new blog. 

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/testing/reset')

      cy.request('POST', 'http://localhost:3001/api/users/register', {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        })

      cy.login('test@example.com' ,'password123')
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title :'Blog title',
        content :'Blog Content',
        image :'download.jpg',
      })
    })
    
    it('use can like blog' ,()=>{
      cy.contains('Blog title').parent().contains('View More').click()
      cy.contains('Likes: 0');
      cy.contains('👍 Like / Unlike').click();
      cy.contains('Likes: 1').should('exist');
    })
  })
7