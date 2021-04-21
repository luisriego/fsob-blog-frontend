// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import jwtDecode from "jwt-decode"

// -- This is a parent command --
let id = ''
let user = ''
Cypress.Commands.add('login', ({username, password}) => { 
    cy.request('POST', 'http://localhost:3001/api/login', {
        username,
        password
      }).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
      })
      cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', ({title, author, url}) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: {
          title,
          author,
          url
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
        }
      }).then((response) => {
        return new Promise(resolve => {        
            expect(response).property('status').to.equal(201)
            expect(response.body).property('id').to.not.be.oneOf([null, ""])
            id = response.body.id
            expect(response.body).property('id').to.equal(id)
            const respBody = response.body;
            resolve(respBody['id'])
        })
      })
      cy.visit('http://localhost:3000')
})

Cypress.Commands.add('editBlog', ({title, author, url, likes}) => { 
    cy.request('GET', 'http://localhost:3001/api/blogs')
      .then(response => {
        expect(response).property('status').to.equal(200)
        const blog = response.body[0]
        expect(blog.user.id).not.to.equal('')
        user = blog.user.id
      })
    cy.request({
        method: 'PUT',
        url: `http://localhost:3001/api/blogs/${id}`,
        body: {
          title,
          author,
          url,
          likes,
          user
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
        }
      })
      cy.visit('http://localhost:3000')
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
