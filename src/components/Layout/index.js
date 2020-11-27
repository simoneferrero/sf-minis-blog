import React from 'react'
import styled, { ThemeProvider, css } from 'styled-components'

import theme from '../../constants/theme'

import Header from '../Header'
import GlobalStyle from '../GlobalStyle'

const StyledLayoutWrapper = styled.div`
  ${({ isRootPath, theme }) => css`
    margin: ${theme.spacing['0']} auto;
    padding: ${theme.spacing['5']} ${theme.spacing['12']};

    main,
    footer {
      margin: ${theme.spacing['0']} auto;
      max-width: ${!isRootPath && theme['max-width'].wrapper};
    }
  `}
`

const Layout = ({ location, title, children }) => {
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
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </small>
        </footer>
      </StyledLayoutWrapper>
    </ThemeProvider>
  )
}

export default Layout
