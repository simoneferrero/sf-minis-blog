import React from 'react'
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
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
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
        excerpt
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
              fluid(maxWidth: 600, maxHeight: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
