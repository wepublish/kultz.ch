import React from 'react'
import {Node} from 'slate'

import {RichText} from '../atoms/richText'
import {cssRule, useStyle} from '@karma.run/react'
import {whenDesktop, pxToRem, whenTablet} from '../style/helpers'
import {Color} from '../style/colors'
import {usePermanentVisibility} from '../utils/hooks'

const RichTextBlockStyle = cssRule<{showBackground: boolean}>(({showBackground}) => ({
  fontSize: pxToRem(18),
  lineHeight: '1.5em',

  marginBottom: pxToRem(50),
  padding: `0 ${pxToRem(25)}`,
  opacity: showBackground ? 1 : 0,
  transform: showBackground ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)',
  transition: 'opacity 500ms ease, transform 700ms ease',

  ...whenTablet({
    fontSize: pxToRem(18),
    width: '75%',
    maxWidth: pxToRem(900),
    margin: `0 auto ${pxToRem(70)}`
  }),

  ...whenDesktop({
    fontSize: pxToRem(18),
    width: '50%',
    maxWidth: pxToRem(900),
    margin: `0 auto ${pxToRem(70)}`
  }),

  '& strong': {fontWeight: 'bold'},
  '& italic': {fontStyle: 'italic'},
  '& h1': {
    lineHeight: '1.2em',
    fontSize: '2.6em',
    marginTop: 0,
    marginBottom: '1em',
    fontWeight: 'normal'
  },
  '& h2': {
    lineHeight: '1.2em',
    fontSize: '2.2em',
    marginTop: 0,
    marginBottom: '1em',
    fontWeight: 'normal'
  },
  '& h3': {
    lineHeight: '1.2em',
    fontSize: '1.8em',
    marginTop: 0,
    marginBottom: '1em',
    fontWeight: 'normal'
  },
  '& p': {
    lineHeight: '1.5em',
    fontSize: '1em',
    marginBottom: '2.5rem',
    marginTop: 0
  },
  '& p a': {
    color: Color.PrimaryLight,
    textDecoration: 'underline',
    transition: 'color 200ms ease',

    '&:hover': {
      color: Color.Black
    }
  }
}))

export const ListStyles = cssRule({
  '& ul': {
    paddingLeft: '2em'
  },

  '& ol': {
    paddingLeft: '2em',
    listStyle: 'none',
    counterReset: 'list',

    '& li': {
      position: 'relative'
    },

    '& li:before': {
      counterIncrement: 'list',
      content: 'counter(list)"."',
      position: 'absolute',
      left: '-37px',
      width: '30px',
      textAlign: 'right',
      letterSpacing: '-2.5px',
      fontVariantNumeric: 'tabular-nums'
    }
  },

  '& p a': {
    color: Color.PrimaryLight,
    textDecoration: 'underline',
    transition: 'color 200ms ease',

    '&:hover': {
      color: Color.Black
    }
  }
})

export interface RichTextBlockProps {
  readonly value: Node[]
  readonly className?: any
}

export function RichTextBlock({value, className}: RichTextBlockProps) {
  const ref = React.createRef<HTMLParagraphElement>()
  const show = usePermanentVisibility(ref, {threshold: 0})
  const css = useStyle({showBackground: show})

  return (
    <div ref={ref} className={css(RichTextBlockStyle, ListStyles, className)}>
      <RichText value={value} />
    </div>
  )
}
