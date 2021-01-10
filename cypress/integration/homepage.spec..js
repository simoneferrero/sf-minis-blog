/// <reference types="Cypress" />

describe('Given the homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display all the layout elements', () => {
    cy.checkLayout()
  })

  it('should display all posts', () => {
    const posts = [
      {
        title: 'Karnon',
        origin: 'Descent: Journeys in the Dark - Second Edition',
        date: '10 Jan 2021',
        href: 'karnon',
      },
      {
        title: 'Valyndra',
        origin: 'Descent: Journeys in the Dark - Second Edition',
        date: '29 Dec 2020',
        href: 'valyndra',
      },
      {
        title: 'Cave Spiders',
        origin: 'Descent: Journeys in the Dark - Second Edition',
        date: '24 Dec 2020',
        href: 'cave-spiders',
      },
      {
        title: 'Striders',
        origin: 'Horizon Zero Dawn - The Board Game',
        date: '20 Dec 2020',
        href: 'striders',
      },
      {
        title: 'Belthir',
        origin: 'Descent: Journeys in the Dark - Second Edition',
        date: '15 Dec 2020',
        href: 'belthir',
      },
      {
        title: 'Watchers',
        origin: 'Horizon Zero Dawn - The Board Game',
        date: '10 Dec 2020',
        href: 'watchers',
      },
      {
        title: 'Campaign Battle - Belthir & Sorcerers',
        origin: 'Descent: Journeys in the Dark - Second Edition',
        date: '06 Dec 2020',
        href: 'campaign-battle-01',
      },
      {
        title: 'Sorcerers',
        origin: 'Descent: Journeys in the Dark - Second Edition',
        date: '04 Dec 2020',
        href: 'sorcerers',
      },
      {
        title: 'First Post',
        origin: 'Beginnings',
        date: '03 Dec 2020',
        href: 'first-post',
      },
    ]

    cy.findAllByTestId('postListItem')
      .should('have.length', posts.length)
      .each((item, index) => {
        const { title, origin, date, href } = posts[index]

        cy.wrap(item)
          .findByTitle(title)
          .should('have.attr', 'href')
          .and('include', href)
        cy.wrap(item).findByAltText(title).should('exist')
        cy.wrap(item).findByText(title).should('exist')
        cy.wrap(item).findByText(origin).should('exist')
        cy.wrap(item).findByTestId(`date-${date}`).should('exist')
      })
  })
})
