import React from 'react'
import {Color} from '../../../styles/colors'
import {RatioContainer} from './ratioContainer'
import {ImageFit, Image} from './image'
import styled from 'styled-components'

const ImageBackground = styled.div`
  background-color: ${Color.NeutralLight};
  width: 100%;
  height: 100%;
`

export interface RatioImageProps {
  src: string
  width: number
  height: number
  fit?: ImageFit
  alt?: string
}

export function RatioImage({src, width, height, fit, alt}: RatioImageProps) {
  return (
    <RatioContainer aspectRatio={width / height}>
      <ImageBackground>
        <Image src={src} alt={alt} fit={fit} />
      </ImageBackground>
    </RatioContainer>
  )
}
