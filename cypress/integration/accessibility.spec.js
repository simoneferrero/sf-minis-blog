/// <reference types="Cypress" />

describe('Given accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/').get('main').injectAxe()
  })

  describe('When a user navigates to the homepage', () => {
    it('Should NOT have detectable accessibility violations', () => {
      cy.checkA11y()
    })
  })

  describe('When a user navigates to a post', () => {
    beforeEach(() => {
      cy.findByText('Belthir').click()
    })

    it('Should NOT have detectable accessibility violations', () => {
      cy.checkA11y()
    })

    describe('And they click on an image in the gallery', () => {
      it('Should NOT have detectable accessibility violations', () => {
        cy.findByLabelText('Display image belthir_01').click().checkA11y()
      })
    })
  })
})
