import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import Instagram from '../../../content/svg/instagram.svg'
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
    grid-gap: ${theme.spacing['2']};
    grid-template-columns: repeat(auto-fit, ${theme.font.size['4']});
    justify-content: right;
    justify-self: right;
    padding-left: ${theme.spacing['2']};
    width: 100%;

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
  const { instagram } = data.site.siteMetadata?.social
  const socials = [
    {
      url: instagram,
      icon: <Instagram />,
    },
  ]

  return (
    <StyledHeader>
      <StyledLink to="/">
        <StyledLogo alt={title} />
      </StyledLink>
      <StyledSocial>
        {socials.map(({ url, icon }) => (
          <OutboundLink
            href={url}
            rel="noopener noreferrer"
            key={url}
            target="_blank"
          >
            {icon}
          </OutboundLink>
        ))}
      </StyledSocial>
    </StyledHeader>
  )
}

export default Header
