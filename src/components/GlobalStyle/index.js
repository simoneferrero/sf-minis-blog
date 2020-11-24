import { createGlobalStyle, css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	${({ theme }) => css`
		/* HTML elements */

		*,
		:after,
		:before {
			box-sizing: border-box;
		}

		html {
			-moz-osx-font-smoothing: grayscale;
			-webkit-font-smoothing: antialiased;
			font-size: ${theme.font.size.root};
			line-height: ${theme['line-height'].normal};
		}

		body {
			color: ${theme.color.text};
			font-family: ${theme.font.body};
			font-size: ${theme.font.size['1']};
		}

		footer {
			padding: ${theme.spacing['6']} ${theme.spacing['0']};
		}

		hr {
			background: ${theme.color.accent};
			border: 0;
			height: 1px;
		}

		/* Heading */

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-family: ${theme.font.heading};
			letter-spacing: -0.025em;
			line-height: ${theme['line-height'].tight});
			margin-bottom: ${theme.spacing['6']};
			margin-top: ${theme.spacing['12']};
		}

		h2,
		h3,
		h4,
		h5,
		h6 {
			color: ${theme.color.heading};
			font-weight: ${theme.font.weight.bold};
		}

		h1 {
			color: ${theme.color.primary};
			font-size: ${theme.font.size['6']};
			font-weight: ${theme.font.weight.black};
		}

		h2 {
			font-size: ${theme.font.size['5']};
		}

		h3 {
			font-size: ${theme.font.size['4']};
		}

		h4 {
			font-size: ${theme.font.size['3']};
		}

		h5 {
			font-size: ${theme.font.size['2']};
		}

		h6 {
			font-size: ${theme.font.size['1']};
		}

		a,
		h1 > a,
		h2 > a,
		h3 > a,
		h4 > a,
		h5 > a,
		h6 > a {
			color: inherit;
			text-decoration: none;
		}

		/* Prose */

		p {
			--baseline-multiplier: 0.179;
			--x-height-multiplier: 0.35;
			line-height: ${theme['line-height'].relaxed});
			margin: ${theme.spacing['0']} ${theme.spacing['0']} ${theme.spacing['8']} ${theme.spacing['0']};
			padding: ${theme.spacing['0']};
		}

		ul,
		ol {
			list-style-image: none;
			list-style-position: outside;
			margin-bottom: ${theme.spacing['8']};
			margin-left: ${theme.spacing['0']};
			margin-right: ${theme.spacing['0']};
			padding: ${theme.spacing['0']};
		}

		ul li,
		ol li {
			margin-bottom: calc(${theme.spacing['8']} / 2);
			padding-left: ${theme.spacing['0']};
		}

		li > p {
			margin-bottom: calc(${theme.spacing['8']} / 2);
		}

		li *:last-child {
			margin-bottom: ${theme.spacing['0']};
		}

		li > ul {
			margin-left: ${theme.spacing['8']};
			margin-top: calc(${theme.spacing['8']} / 2);
		}

		blockquote {
			border-left: ${theme.spacing['1']} solid ${theme.color.primary};
			color: ${theme.color['text-light']};
			font-size: ${theme.font.size['2']};
			font-style: italic;
			margin-bottom: ${theme.spacing['8']};
			margin-left: calc(-1 * ${theme.spacing['6']});
			margin-right: ${theme.spacing['8']};
			padding: ${theme.spacing['0']} ${theme.spacing['0']} ${theme.spacing['0']} ${theme.spacing['6']};
		}

		blockquote > :last-child {
			margin-bottom: ${theme.spacing['0']};
		}

		blockquote > ul,
		blockquote > ol {
			list-style-position: inside;
		}

		table {
			border-collapse: collapse;
			border-spacing: 0.25rem;
			margin-bottom: ${theme.spacing['8']};
			width: 100%;
		}

		table thead tr th {
			border-bottom: 1px solid ${theme.color.accent};
		}

		/* Link */

		a {
			color: ${theme.color.primary};
		}

		a:hover,
		a:focus {
			text-decoration: none;
		}

		/* Media queries */

		@media (max-width: 42rem) {
			blockquote {
				margin-left: ${theme.spacing['0']};
				padding: ${theme.spacing['0']} ${theme.spacing['0']} ${theme.spacing['0']} ${theme.spacing['4']};
			}
			ul,
			ol {
				list-style-position: inside;
			}
		}
	`}
`

export default GlobalStyle
