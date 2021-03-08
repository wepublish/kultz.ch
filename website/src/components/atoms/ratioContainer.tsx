import React, {ReactNode} from 'react'
import styled from 'styled-components'

const BaseRatioContainer = styled.div`
  height: 0;
  position: relative;
  width: 100%;
  padding-top: ${(props: {paddingTop: number}) => props.paddingTop}%;
`

const ContentContainer = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  &img {
    height: 100%;
  }
`

export interface RatioContainerProps {
  readonly aspectRatio: number
  children: ReactNode
}

export function RatioContainer({aspectRatio, children}: RatioContainerProps) {
  const paddingTop = aspectRatio === 0 ? 100 : 100 / aspectRatio

  return (
    <BaseRatioContainer paddingTop={paddingTop}>
      <ContentContainer>{children}</ContentContainer>
    </BaseRatioContainer>
  )
}
