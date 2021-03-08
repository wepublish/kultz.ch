import React from 'react'
import {Node} from 'slate'
import {RichText} from '../atoms/RichText'

import {pxToRem, whenDesktop, whenTablet} from '../../../styles/helpers'

import {usePermanentVisibility} from '../utils/hooks'
import styled from 'styled-components'
import {Color} from '../../../styles/colors'

interface BaseRichTextBlockProps {
  showBackground: boolean
}

const BaseRichTextBlock = styled.div`
  font-size: ${pxToRem(15)};
  line-height: 1.5em;
  margin-bottom: ${pxToRem(50)};
  padding: 0 ${pxToRem(25)};
  opacity: ${(props: BaseRichTextBlockProps) => (props.showBackground ? 1 : 0)};
  transform: ${(props: BaseRichTextBlockProps) =>
    props.showBackground ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)'};
  transition: opacity 500ms ease, transform 700ms ease;

  ${{
    ...whenTablet({
      fontSize: pxToRem(17),
      width: '75%',
      maxWidth: pxToRem(900),
      margin: `0 0 ${pxToRem(70)}`
    }),
    ...whenDesktop({
      fontSize: pxToRem(17),
      width: '50%',
      maxWidth: pxToRem(900),
      margin: `0 0 ${pxToRem(70)}`
    })
  }}

  strong {
    font-weight: bold;
  }

  italic {
    font-style: italic;
  }

  h2 {
    line-height: 1.2em;
    font-size: 2.6em;
    margin-top: 0;
    margin-bottom: 1em;
    font-weight: normal;
  }

  h3 {
    line-height: 1.2em;
    font-size: 2em;
    margin-top: 0;
    margin-bottom: 1em;
    font-weight: normal;
  }

  p {
    line-height: 1.5em;
    font-size: 1em;
    margin-bottom: 2.5rem;
    margin-top: 0;
  }

  p a {
    color: ${Color.PrimaryLight};
    text-decoration: underline;
    transition: color 200ms ease;

    &:hover {
      color: ${Color.Black};
    }
  }
`

export interface RichTextBlockProps {
  readonly value: Node[]
}

export function RichTextBlock({value}: RichTextBlockProps) {
  const ref = React.createRef<HTMLParagraphElement>()
  const show = usePermanentVisibility(ref, {threshold: 0})

  return (
    <BaseRichTextBlock ref={ref} showBackground={show}>
      <RichText value={value} />
    </BaseRichTextBlock>
  )
}
