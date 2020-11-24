import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import styled, { css } from 'styled-components'

const StyledPostListItem = styled.li`
  ${({ theme }) => css`
    article {
      text-align: center;
      overflow: hidden;
      text-decoration: none;

      .image-wrapper {
        position: relative;

        .gatsby-image-wrapper > div {
          padding-bottom: 100% !important;
        }

        .date {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          height: 100px;
          width: 100px;
          background-color: white;
          border-radius: 50%;
          display: grid;
          overflow: hidden;
          text-wrap: wrap;
          place-items: center;
          color: ${theme.color.text};
          padding: ${theme.spacing['3']};
        }
      }

      .title {
        background-image: linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, .6) 80%, rgba(255, 255, 255, 0));
        bottom: 0;
        left: 0;
        margin-top: 50px;
        margin-bottom: ${theme.spacing['0']};
        padding: ${theme.spacing['2']} ${theme.spacing['0']};
        width: 100%;

        p {
          color: ${theme.color.text};
          font-weight: ${theme.font.weight.bold};
        }

        h2 {
          font-size: ${theme.font.size['4']};
          margin: ${theme.spacing['0']};
        }
      }

      p {
        margin-bottom: ${theme.spacing['0']};
      }
    }
  `}
`

const PostListItem = ({ date, description, origin, featuredImage, slug, title }) => {
  return (
    <StyledPostListItem>
      <Link to={slug} itemProp="url">
        <article
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className="image-wrapper">
            <Img
              fluid={featuredImage.childImageSharp.fluid}
              alt={description}
            />
            <section className="date">
              <p>
                {date}
              </p>
            </section>
          </div>
          <header className="title">
            <p><small>{origin}</small></p>
            <h2>
                <span itemProp="headline">{title}</span>
            </h2>
          </header>
        </article>
      </Link>
    </StyledPostListItem>
  )
}

export default PostListItem
