import {ElementID} from '../elementID'
import {useFont, useStaticStyle} from '@karma.run/react'

export function GlobalStyles() {
  const staticCSS = useStaticStyle()

  const font = useFont()

  font('Noe Text',
    ['/static/fonts/NoeText-Regular.woff', '/static/fonts/NoeText-Regular.woff2'],
    {
      fontWeight: 'normal'
    })

  font('Noe Text',
    ['/static/fonts/NoeText-Bold.woff', '/static/fonts/NoeText-Bold.woff2'],
    {
      fontWeight: 'bold'
    })

  font('Noe Text',
    ['/static/fonts/NoeText-RegularItalic.woff', '/static/fonts/NoeText-RegularItalic.woff2'],
    {
      fontWeight: 'normal',
      fontStyle: 'italic'
    })

  staticCSS('html', {
    fontFamily: `'Noe Text', Arial, sans-serif`,
    fontSize: '62.5%'
  })

  staticCSS(`body, html, #${ElementID.ReactRoot}`, {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0
  })

  staticCSS('body', {
    fontSize: '1.6rem'
  })

  staticCSS('a, a:link, a:visited, a:hover, a:active', {
    color: 'inherit',
    textDecoration: 'none'
  })

  staticCSS('*, :after, :before', {
    boxSizing: 'border-box'
  })

  return null
}
