import React from 'react'
import {useStyle, cssRule} from '@karma.run/react'

export const LogoStyle = cssRule({
  display: 'block',
  height: '9em'
})

export const SmallLogoStyle = cssRule({
  height: '1em',
})

export function Logo() {
  const css = useStyle()

  return (<img src={'/static/logo.png'} className={css(LogoStyle)} />)
}

export function SmallLogo() {
  const css = useStyle()

  // prettier-ignore
  return (<img src={'/static/logo_small.png'} className={css(LogoStyle, SmallLogoStyle)} />)
}
