import React from 'react'
import {ImageFit} from '../atoms/image'
import {pxToRem, whenTablet, whenDesktop} from '../../../styles/helpers'
import {RatioImage} from '../atoms/ratioImage'
import {usePermanentVisibility} from '../utils/hooks'
import styled from 'styled-components'

export interface ImageBlockProps {
  readonly src: string
  readonly height: number
  readonly width: number
  readonly description?: string
  readonly caption?: string
  readonly author?: string
}

export interface ImageBlockContainerProps {
  readonly showBackground: boolean
}

const ImageBlockContainer = styled.div((props: ImageBlockContainerProps) => ({
  maxWidth: pxToRem(1600),
  margin: `0 auto ${pxToRem(50)}`,
  fontSize: pxToRem(14),
  opacity: props?.showBackground ? 1 : 0,
  transform: props?.showBackground ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)',
  transition: 'opacity 500ms ease, transform 700ms ease',

  ...whenTablet({
    margin: `0 auto ${pxToRem(70)}`
  }),

  ...whenDesktop({
    margin: `0 auto ${pxToRem(70)}`
  })
}))

const ImageBlockCaption = styled.p`
  padding: 0 ${pxToRem(25)};
  text-align: center;
`

export function ImageBlock(props: ImageBlockProps) {
  const ref = React.createRef<HTMLParagraphElement>()
  const show = usePermanentVisibility(ref, {threshold: 0})

  return (
    <ImageBlockContainer ref={ref} showBackground={show}>
      <RatioImage
        src={props.src}
        alt={props.description || props.caption}
        height={props.height}
        width={props.width}
        fit={ImageFit.Contain}
      />
      {(props.author || props.caption) && (
        <ImageBlockCaption>
          {props.caption} {props.author ? <>(Foto: {props.author})</> : null}
        </ImageBlockCaption>
      )}
    </ImageBlockContainer>
  )
}
