import styled from 'styled-components'
import {pxToRem, whenDesktop, whenMobile} from '../../../styles/helpers'

export interface LineSeparatorProps {
  width: string
  margin: number
  marginBottom?: number
  borderColor: string
  mobileWidth?: string
}

export const LineSeparator = styled.hr((props: LineSeparatorProps) => ({
  borderBottom: `1px solid ${props?.borderColor ?? ''}`,
  margin: `${pxToRem(props?.margin)} 0`,
  marginBottom: `${pxToRem(props?.marginBottom)}`,

  ...whenMobile({
    width: props?.mobileWidth ?? 'auto'
  }),

  ...whenDesktop({
    width: props?.width ?? 'auto'
  })
}))

export default LineSeparator
