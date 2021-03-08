import React from 'react'
import styled from 'styled-components'

export enum ImageFit {
  Contain = 'contain',
  Cover = 'cover'
}

export interface ImageStyleProps {
  fit: ImageFit
}

export interface ImageProps {
  readonly src: string
  readonly width?: number
  readonly height?: number
  readonly fit?: ImageFit
  readonly alt?: string
}

export const BaseImage = styled.img`
  width: ${props => props.width ?? '100%'};
  height: ${props => props.height ?? '100%'};
  display: block;
  object-fit: ${(props: ImageStyleProps) => props.fit};
`

export function Image({src, width, height, fit, alt}: ImageProps) {
  return <BaseImage fit={fit} src={src} alt={alt} width={width} height={height} />
}
