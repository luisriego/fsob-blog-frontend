describe('Blog app', function() {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    cy.visit('http://localhost:3000')

    const user = {
      username: "menganito",
      name: "Mengano de Zetano",
      password: "test"
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application').click()
  })

  describe('Login',function() {
    it('fails with wrong credentials', function() {
      cy.get('[placeholder=\'Username\']').type('no-user')
      cy.get('[placeholder=\'Password\']').last().type('test')
      cy.contains('Login').click()
      cy.get('.error').should('contain', 'Wrong username or password')
    })

    it('succeeds with correct credentials', function() {
      cy.get('[placeholder=\'Username\']').type('menganito')
      cy.get('[placeholder=\'Password\']').last().type('test')
      cy.contains('Login').click()
      cy.contains('create new blog')
    })
  })

  describe.only('When logged in', () => {
    beforeEach(() => {
      cy.login({username: 'menganito', password: 'test'})
    })

    it('A blog can be created', () => {
      cy.contains('create new blog').click()
      cy.get('[placeholder=\'Title\']').type('The blog was created')
      cy.get('[placeholder=\'Author\']').type('menganito')
      cy.get('[placeholder=\'Url\']').type('www.menganito.com')
      cy.contains('Create').click()
      cy.contains('The blog was created')
    })

    describe.only('When post was created', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'The blog was created',
          author: 'menganito',
          url: 'www.menganito.com'
        })

        cy.createBlog({
          title: 'Other blog',
          author: 'menganito',
          url: 'www.menganito.com'
        })

        cy.createBlog({
          title: 'Another blog',
          author: 'menganito',
          url: 'www.menganito.com'
        })

        cy.editBlog({
          id: '123456789',
          title: 'Another blog',
          author: 'menganito',
          url: 'www.menganito.com',
          likes: 3
        })
      })

      it('the like button add or subs 1', () => {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
        cy.contains('like').click()
        cy.contains('likes 0')
      })

      it('the user who creates the post can delete it', () => {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.success').should('contain', 'Blog removed successfully')
        cy.visit('http://localhost:3000')
      })
    })
  })
})