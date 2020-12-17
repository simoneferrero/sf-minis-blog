import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

import Facebook from '../../../content/svg/facebook.svg'
import Instagram from '../../../content/svg/instagram.svg'
import Twitter from '../../../content/svg/twitter.svg'
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
            facebook
            instagram
            twitter
          }
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata
  const { facebook, instagram, twitter } = data.site.siteMetadata?.social
  const socials = [
    {
      icon: <Facebook />,
      text: 'Facebook',
      url: facebook,
    },
    {
      icon: <Instagram />,
      text: 'Instagram',
      url: instagram,
    },
    {
      icon: <Twitter />,
      text: 'Twitter',
      url: twitter,
    },
  ]

  return (
    <StyledHeader>
      <StyledLink to="/">
        <StyledLogo alt={title} />
      </StyledLink>
      <StyledSocial>
        {socials.map(({ icon, text, url }) => (
          <OutboundLink
            href={url}
            rel="noopener noreferrer"
            key={url}
            target="_blank"
            title={text}
          >
            {icon}
          </OutboundLink>
        ))}
      </StyledSocial>
    </StyledHeader>
  )
}

export default Header
