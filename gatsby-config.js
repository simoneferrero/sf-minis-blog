require('dotenv').config({
  path: '.env',
})

module.exports = {
  siteMetadata: {
    title: `SF Minis Blog`,
    author: {
      name: `Simone Ferrero`,
      summary: `Programmer, team lead, amateur painter, bad footballer, unfortunately not Batman.`,
    },
    description: `A showcase for my painted miniatures.`,
    siteUrl: `https://sfminis.net/`,
    source: `https://github.com/simoneferrero/sf-minis-blog`,
    social: {
      facebook: `https://facebook.com/sfminis`,
      instagram: `https://instagram.com/sf_minis`,
      twitter: `https://twitter.com/sfminis`,
      youtube: `https://www.youtube.com/channel/UCKs5Bp-q-eFfwqtFIw5AypQ`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SF Minis Blog`,
        short_name: `SFMinis`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00adb5`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.sfminis.net',
        sitemap: 'https://www.sfminis.net/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `sfminis`,
      },
    },
    'gatsby-plugin-catch-links',
  ],
}
