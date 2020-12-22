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

Additionally, you have to add a test case for the newly created post, or else the tests will not pass and you will not be able to push to origin.

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

### End to end testing

End to end tests are run with [Cypress](https://www.cypress.io).

To start the Cypress Dashboard, run the following command:

```
yarn test
```

which will start the application in a new web server at `localhost:7000` and follow it up with Cypress.

The tests will check the website UI, its accessibility, as well as how many posts have been published to date.

**You must add a test case for each new post as part of the commit for that post.**

The tests will run in the following conditions:

- Upon pushing a commit to origin, they will be run locally in headless mode on Chrome
- When creating a PR and on each commit push, they will run in Github and the results will appear in the PR actions
- When merging a PR to main

#### Cypress on WSL 2 in Windows

When run in Windows on the WSL 2, there are some additional steps that need to be taken to set up the machine in order to run Cypress.

[This article](https://dev.to/nickymeuleman/using-graphical-user-interfaces-like-cypress-in-wsl2-249j) explains them in detail and by the end of it, the environment should be fully set up to take advantage of the tool.

In short, these are the steps:

1. Download and install an X-server client to display what is happening within the WSL. The suggested one is [VcXsrv](https://sourceforge.net/projects/vcxsrv/).
   - When starting the program, make sure to select "Disable access control" in the options and make sure that the firewall allows the application to pass through.
2. Install the required dependencies for Cypress. They vary according to the distro of choice, but more instructions can be found on [this page](https://docs.cypress.io/guides/guides/continuous-integration.html#Advanced-setup).
   - If you want to run your tests in a specific browser, make sure to install the browser in the WSL too! For example, [this](https://gist.github.com/drexler/d70ab957f964dbef1153d46bd853c775) is how to add Chrome to the list of available browsers.
3. Set a `DISPLAY` variable by adding the following line to `.bashrc`:
   - `export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0`.
   - You can confirm it has worked by running `source ~/.bashrc` and confirming the value of the variable with `echo $DISPLAY`.
4. Start `dbus` automatically by adding another line to `.bashrc`:
   - `sudo /etc/init.d/dbus start &> /dev/null`.
5. Grant dbus passwordless access by running this command in the terminal:
   - `sudo visudo -f /etc/sudoers.d/dbus`.
   - It will open a Nano editor in which you will need to write and save the following line: `<your_username> ALL = (root) NOPASSWD: /etc/init.d/dbus`
     - Replace `<your_username>` with your username - type `whoami` if you are not sure.

Once all of these steps are over, you should be able to launch Cypress and have it working on WSL!

---

## Deployment

Deployment for this app is automated via [Gatsby Cloud](https://www.gatsbyjs.com/cloud/) and [Netlify](https://netlify.com).

The former integrates with Github to detect when a new PR to the `main` branch is created, build the code and deploy it to a temporary staging environment for preview. This is also the step in which Cypress tests are run first.

Once the PR gets merged, Netlify deploys the built code to the correct domain.

In both cases, Gatsby Online automatically provides a Lighthouse report of the website.

---

## Other functionality

### RSS feed

An RSS feed is available at the path `/rss.xml` and gets updated automatically every time that a new post is added.

### Sitemap and SEO

Similarly to the RSS feed, a sitemap can be accessed at `/sitemap.xml` and is used by search engines to optimise the crawl. The website is also fully optimised for SEO using keywords and allowing all agents.

### Comments and likes

Commenting functionality is provided by [Disqus](https://disqus.com/). This application currently runs on its free tier, which comes with ads and some slightly limited functionality for admins. Users need to be logged in to be able to like or comment under a post.
