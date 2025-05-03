// describe('Frontend availability', () => {
//   it('should load the frontend homepage', () => {
//     cy.visit('http://localhost:5173');
//   });
// });

// 5.23
// Make a test that checks that the blogs are ordered by likes, with the most liked blog being first.

describe('Blog ordering by likes' , ()=>{
    beforeEach(()=>{
        cy.request('POST','http://localhost:3001/testing/reset')

        const user ={
            name :'userC',
            email:'userC@gmail.com',
            password :'PassworduserC'
        }
        cy.request('POST' ,'http://localhost:3001/api/users/register',user)

        cy.login('userC@gmail.com' ,'PassworduserC')
    })

    it('ordering by likes in descending order' , ()=>{
        cy.createBlog({title :'Least Liked' , content :'least one liked post' , image :'download.jpg'})
        cy.createBlog({title :'Medium Liked' ,content:'average likes post',image :'download.jpg'})
        cy.createBlog({title :'Most Liked' ,content:'mostly likes blog post',image :'download.jpg'})

        cy.contains('Least Liked').parents().contains('View More').click()
        cy.contains('Medium Liked').parents().contains('View More').click()
        cy.contains('Most Liked').parents().contains('View More').click()

        cy.contains('Least Liked').parents().as('least')
        cy.contains('Medium Liked').parents().as('medium')
        cy.contains('Most Liked').parents().as('most')

        cy.get('@least').contains('👍 Like / Unlike').click()
        cy.get('@least').should('contain' ,'Likes: 1')

        cy.get('@medium').contains('👍 Like / Unlike').click()
        cy.get('@medium').should('contain', 'Likes: 1')
        cy.wait(300)
        cy.get('@medium').contains('👍 Like / Unlike').click()
        cy.get('@medium').should('contain', 'Likes: 2')


        cy.get('@most').contains('👍 Like / Unlike').click()
        cy.get('@most').should('contain', 'Likes: 1')
        cy.wait(300)
        cy.get('@most').contains('👍 Like / Unlike').click()
        cy.get('@most').should('contain', 'Likes: 2')
        cy.wait(300)
        cy.get('@most').contains('👍 Like / Unlike').click()
        cy.get('@most').should('contain', 'Likes: 3')
        
          
        cy.get('.blog').eq(0).should('contain' , 'Most Liked')
        cy.get('.blog').eq(1).should('contain' , 'Medium Liked')
        cy.get('.blog').eq(2).should('contain' , 'Least Liked')
    })
})