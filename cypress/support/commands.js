Cypress.Commands.add('checkLayout', () => {
  // Header
  const socials = [
    { title: 'Facebook', href: 'https://facebook.com/sfminis' },
    { title: 'Instagram', href: 'https://instagram.com/sf_minis' },
    { title: 'Twitter', href: 'https://twitter.com/sfminis' },
    {
      title: 'Youtube',
      href: 'https://www.youtube.com/channel/UCKs5Bp-q-eFfwqtFIw5AypQ',
    },
  ]

  cy.findByTitle('SF Minis Blog').should('exist')
  cy.findAllByTestId('socialUrl')
    .should('have.length', 4)
    .each((item, index) => {
      cy.wrap(item)
        .should('have.attr', 'title', socials[index].title)
        .should('have.attr', 'href')
        .and('include', socials[index].href)
    })

  // Footer
  cy.findByText(new RegExp(`© ${new Date().getFullYear()}`)).should('exist')
  cy.findByText('Gatsby')
    .should('exist')
    .should('have.attr', 'href')
    .and('include', 'https://www.gatsbyjs.com')
  cy.findByText('Github')
    .should('exist')
    .should('have.attr', 'href')
    .and('include', 'https://github.com/simoneferrero/sf-minis-blog')
})
