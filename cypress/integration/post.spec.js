/// <reference types="Cypress" />

describe("Given a post's page", () => {
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

        cy.url().should('not.include', '/belthir/')
      })
    })

    describe('and the user returns to the previous page', () => {
      it('should return to the homepage', () => {
        cy.go('back')

        cy.url().should('not.include', '/belthir/')
      })
    })
  })

  describe('When a user visits the selected page', () => {
    beforeEach(() => {
      cy.visit('/belthir/')
    })

    it('should correctly load the page and its elements', () => {
      // Path name and layout
      cy.location('pathname').should('equal', '/belthir/')
      cy.checkLayout()

      // Post elements
      cy.findByAltText('Belthir').should('exist')
      cy.findByTestId(`date-15 Dec 2020`).scrollIntoView().should('be.visible')
      cy.findByText('Descent: Journeys in the Dark - Second Edition')
        .scrollIntoView()
        .should('be.visible')
      cy.findByText('Belthir').scrollIntoView().should('be.visible')
      cy.findByText(`4 min read`).scrollIntoView().should('be.visible')
      cy.findByTestId('Belthir-video').scrollIntoView().should('be.visible')
      cy.findByTitle(`Article body`).scrollIntoView().should('be.visible')

      // Colors elements
      cy.findByText('Colors').scrollIntoView().should('be.visible')
      cy.findByText('(↓ Expand ↓)').should('be.visible')
      cy.findByText('(↑ Collapse ↑)').should('not.exist')
      cy.findByText('Skin & hair').should('not.be.visible')
      cy.findByText(
        'Army Painter Dragon Red, Army Painter Pure Red, Army Painter Dark Tone Quickwash, Army Painter Hardened Carapace',
      ).should('not.be.visible')

      // Gallery elements
      cy.findByText('Gallery').scrollIntoView().should('be.visible')
      cy.wrap([...Array(5).keys()]).each(key => {
        cy.findByLabelText(`Display image belthir_0${key + 1}`)
          .scrollIntoView()
          .should('be.visible')
      })

      // Comments
      cy.get('#disqus_thread').scrollIntoView().should('be.visible')

      // Post navigation
      cy.findByTitle('Go to Watchers')
        .should('have.attr', 'href')
        .and('include', 'watchers')
      cy.findByText('←').should('be.visible')
      cy.findByAltText('Go to Watchers').should('exist')
      cy.findByText('Watchers').should('exist')

      cy.findByTitle('Go to Striders')
        .trigger('mouseover')
        .should('have.attr', 'href')
        .and('include', 'striders')
      cy.findByText('→').should('exist')
      cy.findByAltText('Go to Striders').should('exist')
      cy.findByText('Striders').should('exist')
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

    describe('and the user expands the colors tab', () => {
      beforeEach(() => {
        cy.findByText('Colors').scrollIntoView().should('be.visible').click()
      })

      it('should display the table of colors', () => {
        cy.findByText('(↓ Expand ↓)').should('not.exist')
        cy.findByText('(↑ Collapse ↑)').should('be.visible')
        cy.findByText('Skin & hair').should('be.visible')
        cy.findByText(
          'Army Painter Dragon Red, Army Painter Pure Red, Army Painter Dark Tone Quickwash, Army Painter Hardened Carapace',
        ).should('be.visible')
        cy.findByText('Bone').should('be.visible')
        cy.findByText(
          'Army Painter Brainmatter Beige, Army Painter Werewolf Fur, Army Painter Strong Tone Quickwash',
        ).should('be.visible')
      })

      describe('and the user collapses the colors tab', () => {
        it('should NOT display the table of colors', () => {
          cy.findByText('Colors').scrollIntoView().should('be.visible').click()

          cy.findByText('(↓ Expand ↓)').should('be.visible')
          cy.findByText('(↑ Collapse ↑)').should('not.exist')
          cy.findByText('Skin & hair').should('not.be.visible')
          cy.findByText(
            'Army Painter Dragon Red, Army Painter Pure Red, Army Painter Dark Tone Quickwash, Army Painter Hardened Carapace',
          ).should('not.be.visible')
          cy.findByText('Bone').should('not.be.visible')
          cy.findByText(
            'Army Painter Brainmatter Beige, Army Painter Werewolf Fur, Army Painter Strong Tone Quickwash',
          ).should('not.be.visible')
        })
      })
    })

    describe('and the user clicks on an image in the gallery', () => {
      beforeEach(() => {
        cy.findByLabelText('Display image belthir_02').scrollIntoView().click()
      })

      it('should correctly open that image in a larger view', () => {
        cy.findByAltText('belthir_02 full').should('be.visible')
        cy.findByText('belthir_02').should('be.visible')
      })

      describe('and the user clicks on the close button', () => {
        it('should close the gallery', () => {
          cy.findByLabelText('Close gallery view').click({ force: true })
          cy.findByAltText('belthir_02 full').should('not.exist')
        })
      })

      const testCases = [
        {
          direction: 'next',
          number: '3',
        },
        {
          direction: 'previous',
          number: '1',
        },
      ]

      testCases.forEach(({ direction, number }) => {
        describe(`and the user clicks on the ${direction} image button`, () => {
          it(`should display the ${direction} image`, () => {
            cy.findByTitle(`Show ${direction} image`).click()
            cy.findByAltText(`belthir_0${number} full`).should('be.visible')
            cy.findByText(`belthir_0${number}`).should('be.visible')
          })
        })
      })
    })
  })
})
