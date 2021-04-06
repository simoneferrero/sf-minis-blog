/// <reference types="Cypress" />
import posts from '../constants/posts'

describe('Given the homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display all the layout elements', () => {
    cy.checkLayout()
  })

  it('should display all posts', () => {
    cy.findAllByTestId('postListItem')
      .should('have.length', posts.length)
      .each((item, index) => {
        const { title, origin, date, href } = posts[index]

        cy.wrap(item)
          .findByTitle(title)
          .scrollIntoView()
          .should('have.attr', 'href')
          .and('include', href)
        cy.wrap(item).findByAltText(title).should('exist')
        cy.wrap(item).findByText(title).should('exist')
        cy.wrap(item).findByText(origin).should('exist')
        cy.wrap(item).findByTestId(`date-${date}`).should('exist')
      })
  })
})
