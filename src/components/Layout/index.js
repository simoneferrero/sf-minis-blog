import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider, css } from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

import theme from '../../constants/theme'

import Header from '../Header'
import GlobalStyle from '../GlobalStyle'

const StyledLayoutWrapper = styled.div`
  ${({ isRootPath, theme }) => css`
    margin: ${theme.spacing['0']} auto;
    padding: ${theme.spacing['5']} ${theme.spacing['12']};

    main {
      margin: ${theme.spacing['0']} auto;
      max-width: ${!isRootPath && theme['max-width'].wrapper};
    }

    footer {
      margin: ${theme.spacing['0']} auto;
      max-width: ${theme['max-width'].wrapper};

      a {
        color: ${theme.color.heading};
      }
    }
  `}
`

const Layout = ({ location, children }) => {
  const {
    site: {
      siteMetadata: { source },
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          source
        }
      }
    }
  `)

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledLayoutWrapper isRootPath={isRootPath}>
        <Header />
        <main>{children}</main>
        <footer>
          <small>
            © {new Date().getFullYear()}, Built with
            {` `}
            <OutboundLink
              href="https://www.gatsbyjs.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Gatsby
            </OutboundLink>
            . Check out the source code on
            {` `}
            <OutboundLink
              href={source}
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </OutboundLink>
          </small>
        </footer>
      </StyledLayoutWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
