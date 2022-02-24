import React, {useEffect} from 'react'
import {useScript} from '../utility'
import {cssRule, useStyle} from '@karma.run/react'
import {pxToRem, whenDesktop, whenTablet} from '../style/helpers'

declare global {
  interface Window {
    _ASO: {
      loadAd(param1: string, param2: string): void
    }
  }
}

export interface BildwurfAdEmbedProps {
  zoneID: string
}

const BildwurfAdStyle = cssRule<{showBackground: boolean}>(({showBackground}) => ({
  fontSize: pxToRem(18),
  lineHeight: '1.5em',
  width: '100%',
  //marginBottom: pxToRem(-50),
  //padding: `0 ${pxToRem(25)}`,
  opacity: showBackground ? 1 : 0,
  transform: showBackground ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)',
  transition: 'opacity 500ms ease, transform 700ms ease',

  ...whenTablet({
    fontSize: pxToRem(18),
    //margin: `0 auto ${pxToRem(70)}`
  }),

  ...whenDesktop({
    fontSize: pxToRem(18),
    //margin: `0 auto ${pxToRem(70)}`
  }),
}))

export function BildwurfAdEmbed({zoneID}: BildwurfAdEmbedProps) {
  const {load} = useScript(
    `https://media.online.bildwurf.ch/js/code.min.js`,
    () => {
      return typeof window !== 'undefined' ? !!window._ASO : false
    },
    false
  )

  useEffect(() => {
    load()
    try {
      window._ASO.loadAd('bildwurf-injection-wrapper', zoneID)
    } catch (error) {
      console.warn('could not call _ASO.loadAd()')
    }
  }, [])

  const css = useStyle({showBackground: true})

  return (
    <div className={css(BildwurfAdStyle)}>
      <div id="bildwurf-injection-wrapper">
        <ins className="aso-zone" data-zone={zoneID}></ins>
      </div>
    </div>
  )
}
