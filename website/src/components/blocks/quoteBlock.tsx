import React from 'react'
import styled from 'styled-components'
import {pxToRem, whenTablet, whenDesktop} from '../../../styles/helpers'
import {usePermanentVisibility} from '../utils/hooks'

export interface QuoteBlockProps {
  readonly text: string
  readonly author?: string
}

export interface BaseQuoteProps {
  showBackground?: boolean
}

const BaseQuote = styled.blockquote((props: BaseQuoteProps) => ({
  margin: `0 auto ${pxToRem(50)}`,
  padding: `0 ${pxToRem(25)}`,
  opacity: props.showBackground ? 1 : 0,
  transform: props.showBackground ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)',
  transition: 'opacity 500ms ease, transform 700ms ease',
  width: '75%',

  ...whenTablet({
    margin: `0 auto ${pxToRem(70)}`,
    maxWidth: pxToRem(1000)
  }),

  ...whenDesktop({
    margin: `0 auto ${pxToRem(70)}`,
    width: '75%',
    maxWidth: pxToRem(1000)
  })
}))

const BaseQuoteParagraph = styled.p`
  font-size: ${pxToRem(25)};
  font-style: italic;
  line-height: 1.3em;
  margin: 0 0 ${pxToRem(10)};
`

const BaseQuoteCite = styled.cite`
  text-align: left;
  display: block;
`

export function QuoteBlock({text, author}: QuoteBlockProps) {
  const ref = React.createRef<HTMLParagraphElement>()
  const show = usePermanentVisibility(ref, {threshold: 0})
  return (
    <BaseQuote ref={ref} showBackground={show}>
      <BaseQuoteParagraph>{text}</BaseQuoteParagraph>
      {author && <BaseQuoteCite>{author}</BaseQuoteCite>}
    </BaseQuote>
  )
}
