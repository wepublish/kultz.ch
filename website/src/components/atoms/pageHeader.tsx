import React from 'react'
//
import {Color} from '../../../styles/colors'
import {pxToRem} from '../../../styles/helpers'

// const PageHeaderStyle = cssRule({
//   backgroundColor: Color.SecondaryLight,
//   height: pxToRem(110),
//   textTransform: 'uppercase',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   textAlign: 'center'
// })

export interface PageHeaderProps {
  title: string
}

export function PageHeader({title}: PageHeaderProps) {
  // const css = useStyle()
  return (
    <div
    // className={css(PageHeaderStyle)}
    >
      <div>{title}</div>
    </div>
  )
}
