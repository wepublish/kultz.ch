import React from 'react'
import {Color} from '../../../styles/colors'
import {pxToRem} from '../../../styles/helpers'
import styled, {css} from 'styled-components'

export interface RoundImageStyleStyleProps {
  width: number | undefined
  height: number | undefined
}

export const RoundImage = styled.img`
  ${(props: any) =>
    css`
      width: ${pxToRem(props.width)};
      height: ${pxToRem(props.height)};
      object-fit: cover;
      background-color: ${Color.NeutralDark};
      border-radius: 100%;
    `}
`

export interface RoundImageProps {
  readonly src: string
  readonly width?: number
  readonly height?: number
  readonly alt?: string
}

// export function BaseRoundImage({src, width, height, alt}: RoundImageProps) {
//   return (
//     <img
//       // className={css(RoundImageStyle)}
//       src={src}
//       width={width}
//       height={height}
//       alt={alt}
//     />
//   )
// }
