import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import Instagram from '../../../content/svg/instagram.svg'
import Github from '../../../content/svg/github.svg'
import Logo from '../../../content/svg/logo.svg'

const StyledHeader = styled.header`
  display: grid;
  grid-template-areas: '. logo social';
  grid-template-columns: 1fr auto 1fr;
  margin-bottom: ${({ theme }) => theme.spacing['12']};

  > * {
    align-self: center;
  }
`

const StyledLogo = styled(Logo)`
  ${({ theme }) => css`
    height: ${theme.size.logo};
    width: ${theme.size.logo};
  `}
`

const StyledLink = styled(Link)`
  grid-area: logo;
  justify-self: center;
`

const StyledSocial = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: grid;
    grid-area: social;
    grid-column-gap: ${theme.spacing['4']};
    grid-template-columns: repeat(2, 1fr);
    justify-self: right;

    svg {
      fill: ${theme.color.primary};
      height: ${theme.font.size['4']};
    }
  `}
`

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          social {
            instagram
            github
          }
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata
  const { instagram, github } = data.site.siteMetadata?.social
  const socials = [
    {
      url: instagram,
      icon: <Instagram />,
    },
    {
      url: github,
      icon: <Github />,
    },
  ]

  return (
    <StyledHeader>
      <StyledLink to="/">
        <StyledLogo alt={title} />
      </StyledLink>
      <StyledSocial>
        {socials.map(({ url, icon }) => (
          <a href={url} rel="noopener noreferrer" key={url} target="_blank">
            {icon}
          </a>
        ))}
      </StyledSocial>
    </StyledHeader>
  )
}

export default Header
