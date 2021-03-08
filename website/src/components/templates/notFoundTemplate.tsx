import React from 'react'
import {pxToRem, hexToRgb, whenDesktop} from '../../../styles/helpers'
import {Color} from '../../../styles/colors'
import styled from 'styled-components'

export const NotFoundTemplateContent = styled.div({
  padding: pxToRem(20),
  backgroundColor: Color.Error,
  height: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  ':before': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    background: `radial-gradient(ellipse at center, rgba(${hexToRgb(
      Color.Secondary
    )},1) 0%, rgba(${hexToRgb(Color.Secondary)},0) 100%)`,
    pointerEvents: 'none'
  }
})

export interface NotFoundTemplateProps {
  readonly statusCode?: number
}

export function NotFoundTemplate({statusCode = 404}: NotFoundTemplateProps) {
  return (
    <NotFoundTemplateContent>
      <p>Article not found</p>
    </NotFoundTemplateContent>
  )
}
