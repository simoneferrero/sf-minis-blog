import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import FeaturedImage from '../FeaturedImage'

const StyledPostListItem = styled.li`
  ${({ theme }) => css`
    article {
      overflow: hidden;
      text-align: center;
      text-decoration: none;

      .title {
        background-image: linear-gradient(
          0deg,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0.6) 80%,
          rgba(255, 255, 255, 0)
        );
        bottom: 0;
        left: 0;
        margin-bottom: ${theme.spacing['0']};
        margin-top: 12%;
        padding: ${theme.spacing['2']} ${theme.spacing['0']};
        width: 100%;

        p {
          color: ${theme.color.text};
          font-weight: ${theme.font.weight.bold};
        }

        h2 {
          color: ${theme.color.heading};
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

const PostListItem = ({ date, origin, featuredImage, slug, title }) => {
  return (
    <StyledPostListItem data-testid="postListItem">
      <Link to={slug} itemProp="url" title={title}>
        <article itemScope itemType="http://schema.org/Article">
          <FeaturedImage
            date={date}
            featuredImage={featuredImage}
            title={title}
          />
          <header className="title">
            <p>
              <small>{origin}</small>
            </p>
            <h2>
              <span itemProp="headline">{title}</span>
            </h2>
          </header>
        </article>
      </Link>
    </StyledPostListItem>
  )
}

PostListItem.propTypes = {
  date: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  featuredImage: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PostListItem
