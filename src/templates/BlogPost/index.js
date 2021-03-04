import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import getReadingTime from 'reading-time'
import { Disqus } from 'gatsby-plugin-disqus'

import ColorsDropdown from '../../components/ColorsDropdown'
import Gallery from '../../components/Gallery'
import FeaturedImage from '../../components/FeaturedImage'
import Layout from '../../components/Layout'
import SEO from '../../components/Seo'
import Video from '../../components/Video'

import { StyledBlogPost, StyledBlogPostNav, StyledVideoSection } from './styled'

const BlogPostTemplate = ({ data, location }) => {
  const {
    allFile,
    markdownRemark: { frontmatter, html, id },
    previous,
    next,
  } = data
  const {
    colors,
    date,
    description,
    featuredImage,
    title,
    origin,
    videoSrcURL,
  } = frontmatter
  const readingTime = getReadingTime(html)

  const images = allFile.edges.map(({ node }) => ({
    name: node.name,
    thumb: node.childImageSharp.thumb,
    full: node.childImageSharp.full,
  }))

  const parsedColors = colors && JSON.parse(colors)

  return (
    <Layout location={location} title={title}>
      <SEO title={title} description={description} />
      <StyledBlogPost itemScope itemType="http://schema.org/Article">
        <header>
          <FeaturedImage
            date={date}
            featuredImage={featuredImage}
            isBig
            title={title}
          />
          <p className="origin">
            <small>{origin}</small>
          </p>
          <h1>
            <span itemProp="headline">{title}</span>
          </h1>
          <p className="reading-time">
            <small>{readingTime.text}</small>
          </p>
        </header>
        {videoSrcURL && (
          <StyledVideoSection className="video">
            <Video videoSrcURL={videoSrcURL} videoTitle={title} />
            <hr />
          </StyledVideoSection>
        )}
        <section
          className="body"
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
          title="Article body"
        />
        <hr />
        <ColorsDropdown colors={parsedColors} />
        <hr />
        <section className="gallery">
          <h1>Gallery</h1>
          <Gallery images={images} />
        </section>
        <hr />
      </StyledBlogPost>
      <StyledBlogPostNav>
        {previous && (
          <Link
            className="previous"
            to={previous.fields.slug}
            rel="prev"
            title={`Go to ${previous.frontmatter.title}`}
          >
            <div className="arrow">←</div>
            <div className="thumbnail">
              <GatsbyImage
                image={
                  previous.frontmatter.featuredImage.childImageSharp
                    .gatsbyImageData
                }
                alt={`Go to ${previous.frontmatter.title}`}
              />
              <small>{previous.frontmatter.title}</small>
            </div>
          </Link>
        )}
        {next && (
          <Link
            className="next"
            to={next.fields.slug}
            rel="prev"
            title={`Go to ${next.frontmatter.title}`}
          >
            <div className="arrow">→</div>
            <div className="thumbnail">
              <GatsbyImage
                image={
                  next.frontmatter.featuredImage.childImageSharp.gatsbyImageData
                }
                alt={`Go to ${next.frontmatter.title}`}
              />
              <small>{next.frontmatter.title}</small>
            </div>
          </Link>
        )}
      </StyledBlogPostNav>
      <Disqus
        config={{
          url: location.href,
          identifier: id,
          title: title,
        }}
      />
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              full: PropTypes.object.isRequired,
              thumb: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
    markdownRemark: PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        colors: PropTypes.string,
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            gatsbyImageData: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired,
        videoSrcURL: PropTypes.string,
      }).isRequired,
    }).isRequired,
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            gatsbyImageData: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }),
    previous: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            gatsbyImageData: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $dirRegex: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        description
        origin
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 600
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
        colors
        videoSrcURL
      }
    }
    allFile(
      filter: {
        dir: { regex: $dirRegex }
        extension: { regex: "/(jpg)|(jpeg)|(png)/" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            thumb: gatsbyImageData(
              width: 160
              layout: CONSTRAINED
              aspectRatio: 1
              placeholder: BLURRED
            )
            full: gatsbyImageData(
              width: 1200
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 75
              layout: CONSTRAINED
              aspectRatio: 1
              placeholder: BLURRED
            )
          }
        }
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 75
              layout: CONSTRAINED
              aspectRatio: 1
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`
