# SF Minis Blog

This is the source code of my personal blog about miniature painting.

The blog has been developed with `Gatsby` using react and `styled-components`.

## Adding content

To add new content, you just need to add a new folder inside `content/blog`.

Within that folder, you should create an `index.md` file with Markdown text inside of it.

You are also required to add a frontmatter to the content, to specify details such as the date, title, or featured image name. This is an example of the contents of a valid `index.md` file:

```
---
title: 'First Post'
date: '2020-12-03T19:27:25.523Z'
description: 'Humble beginnings of a beginner miniature painter.'
featuredImage: './first-post_01.jpg'
origin: ''
---

Hello, dear reader! Thank you for landing on my humble blog.
```

You may leave the origin field empty: it refers specifically to blog posts about boardgame miniatures, to show the reader what boardgame they are from.

---

## Local development

If you wish to preview your post locally, or even change the source code to add new features, you must start the Gatsby dev server.

You can do so by running the following commands:

```
yarn
yarn start
```

This will build a non-optimised version of the blog and serve it to [localhost:8000](localhost:8000).

If you wish to preview a production-like version, run the following command instead:

```
yarn build
yarn serve
```

After which it will be available at [localhost:9000](localhost:9000)

<br />

### Environment variables

The only environment variable in use is the optional Google Analytics tracking ID. Locally, it can be injected by creating a `.env` file at the root of the project with the following contents:

```
GA_TRACKING_ID="your-tracking-id"
```

---

## Linting and tests

The code is formatted and linted automatically upon committing new changes.

Future tests will automatically be run before the code gets pushed to origin.

`lint-staged` and `husky` provide the git hooks integration, while `prettier `and `eslint` are used to format and lint the changes.

---

## Deployment

Deployment for this app is automated via [Gatsby Cloud](https://www.gatsbyjs.com/cloud/) and [Netlify](https://netlify.com).

The former integrates with Github to detect when a new PR to the `main` branch is created, build the code and deploy it to a temporary staging environment for preview.

Once the PR gets merged, Netlify deploys the built code to the correct domain.

In both cases, Gatsby Online automatically provides a Lighthouse report of the website.
