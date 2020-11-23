import React from 'react'
import styled, { ThemeProvider, css } from 'styled-components'

import theme from '../constants/theme'

import Header from './Header'
import GlobalStyle from './GlobalStyle'

const StyledLayoutWrapper = styled.div`
  ${({ theme }) => css`
    margin: ${theme.spacing['0']} auto;
    max-width: ${theme['max-width'].wrapper};
    padding: ${theme.spacing['0']} ${theme.spacing['5']};
  `}
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledLayoutWrapper data-is-root-path={isRootPath}>
        <Header />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </StyledLayoutWrapper>
    </ThemeProvider>
  )
}

export default Layout
