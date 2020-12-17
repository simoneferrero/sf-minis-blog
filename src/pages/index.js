import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import Layout from '../components/Layout'
import PostListItem from '../components/PostListItem'
import SEO from '../components/Seo'

const StyledPostList = styled.ol`
  ${({ theme }) => css`
    list-style: none;
    display: grid;
    grid-gap: ${theme.spacing['12']};
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));

    @media screen and (min-width: ${theme['media-queries'].desktop}) {
      grid-template-columns: repeat(4, minmax(300px, 1fr));
    }
  `}
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to `&quot;content/blog`&quot;
          (or the directory you specified for the
          `&quot;gatsby-source-filesystem`&quot; plugin in gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <StyledPostList>
        {posts.map(({ fields, frontmatter }) => {
          return (
            <PostListItem
              key={fields.slug}
              date={frontmatter.date}
              description={frontmatter.description}
              featuredImage={frontmatter.featuredImage}
              origin={frontmatter.origin}
              slug={fields.slug}
              title={frontmatter.title}
            />
          )
        })}
      </StyledPostList>
    </Layout>
  )
}

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }).isRequired,
          frontmatter: PropTypes.shape({
            date: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            origin: PropTypes.string.isRequired,
            featuredImage: PropTypes.shape({
              childImageSharp: PropTypes.shape({
                fluid: PropTypes.object.isRequired,
              }).isRequired,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          description
          origin
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
