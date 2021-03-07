// Update homepage on new content found
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `There is new content available to view. ` +
      `Reload to display the updates?`,
  )

  answer && window.location.reload()
}

// custom typefaces
import 'typeface-montserrat'
// normalize CSS across browsers
import './src/normalize.css'

// Highlighting for code blocks
import 'prismjs/themes/prism.css'
