/// <reference types="Cypress" />

describe('Given navigation on the website', () => {
  describe('When a user clicks on a post from the homepage', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.findByTitle('Belthir').click()
    })

    it('should visit the selected page', () => {
      cy.location('pathname').should('equal', '/belthir/')
    })

    describe('and the user clicks on the main logo', () => {
      it('should return to the homepage', () => {
        cy.findByTitle('SF Minis Blog').click()

        cy.url({ timeout: 10000 }).should('not.include', '/belthir/')
      })
    })

    describe('and the user returns to the previous page', () => {
      it('should return to the homepage', () => {
        cy.go('back')

        cy.url({ timeout: 10000 }).should('not.include', '/belthir/')
      })
    })
  })

  describe('When a user navigates to other posts', () => {
    beforeEach(() => {
      cy.visit('/belthir/')
    })

    const testCases = [
      {
        direction: 'previous',
        title: 'Watchers',
        pathname: 'watchers',
      },
      {
        direction: 'next',
        title: 'Striders',
        pathname: 'striders',
      },
    ]

    testCases.forEach(({ direction, title, pathname }) => {
      describe(`and the user navigates to the ${direction} post`, () => {
        beforeEach(() => {
          cy.findByTitle(`Go to ${title}`).click()
        })

        it('should correctly visit the selected page', () => {
          cy.location('pathname').should('equal', `/${pathname}/`)
        })

        describe('and the user returns to the previous page', () => {
          it('should return to the original post', () => {
            cy.go('back')

            cy.location('pathname').should('equal', '/belthir/')
          })
        })
      })
    })
  })
})
