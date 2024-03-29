import React, {useState} from 'react'
import {useStyle, cssRule} from '@karma.run/react'
import {Color} from '../style/colors'
import {LogoButton} from '../atoms/logoButton'
import {Link, PageRoute} from '../route/routeContext'
import {IconType} from '../atoms/icon'
import {pxToRem, whenDesktop} from '../style/helpers'
import {Interactable} from '../atoms/interactable'
import {RoundIconButton} from '../atoms/roundIconButton'
import {SmallLogo} from '../atoms/logo'
import {NavigationItem} from '../types'

export interface NavigationBarStyleProps {
  readonly isCollapsed: boolean
}
export const NavigationWidthDesktop = 500
export const NavigationWidthCollapsedDesktop = 60
export const NavigationBarStyle = cssRule<NavigationBarStyleProps>(({isCollapsed}) => ({
  backgroundColor: Color.SecondaryDark,
  width: '100%',
  height: '100%',
  position: 'relative',

  fontSize: pxToRem(12),

  ...whenDesktop({
    flexDirection: 'column',
    width: isCollapsed ? pxToRem(NavigationWidthCollapsedDesktop) : pxToRem(NavigationWidthDesktop),
    transition: 'width 200ms ease'
  })
}))

const BackgroundTriggerStyle = cssRule<NavigationBarStyleProps>(({isCollapsed}) => ({
  ...whenDesktop({
    position: 'absolute',
    left: 0,
    top: 0,
    width: isCollapsed ? 0 : '100vw',
    height: '100vh',
    backdropFilter: isCollapsed ? 'blur(0)' : 'blur(4px)',
    zIndex: -1,
    transition: 'backdrop-filter 200ms ease',
    backgroundColor: 'transparent'
  })
}))

export const NavigationBarFiller = cssRule({
  flexGrow: 1,
  ...whenDesktop({flexGrow: 0, height: pxToRem(20)})
})

const NavigationBarHeaderStyle = cssRule<NavigationBarStyleProps>(({isCollapsed}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: pxToRem(10),
  position: 'absolute',
  top: 0,
  zIndex: 1,
  width: '100%',
  backgroundColor: Color.SecondaryDark,
  borderBottom: '1px solid #fff',

  ...whenDesktop({
    padding: `${pxToRem(30)} ${pxToRem(10)}`,
    backgroundColor: 'transparent',
    borderBottom: 'none'
  })
}))

const NavigationLogoStyle = cssRule({
  fontSize: pxToRem(67),
  marginBottom: pxToRem(25),
  fill: Color.NeutralDark,
  order: 0,

  ...whenDesktop({
    marginBottom: 0,
    flexBasis: '5%',
    marginRight: pxToRem(30),
    fontSize: pxToRem(71)
  })
})

const NavigationSocialMediaStyle = cssRule({
  display: 'flex',
  fontSize: pxToRem(40),
  order: 2,

  '& > a': {
    margin: `0 ${pxToRem(9)}`
  },

  ...whenDesktop({
    flexBasis: '20%',
    order: 1
  })
})

const CategoriesStyle = cssRule({
  fontSize: pxToRem(24),
  paddingBottom: pxToRem(10),
  letterSpacing: '0.1rem',
})

const NavigationBackgroundStyle = cssRule<NavigationBarStyleProps>(({isCollapsed}) => ({
  backgroundColor: Color.SecondaryDark,
  paddingTop: pxToRem(60),
  height: '100vh',
  overflow: 'auto',
  transform: isCollapsed ? 'translate3d(-100%,0,0)' : 'translate3d(0,0,0)',
  transition: 'transform 200ms ease',

  ...whenDesktop({
    paddingTop: pxToRem(100)
  })
}))

const NavigationInnerBlockStyle = cssRule<NavigationBarStyleProps>(({isCollapsed}) => ({
  padding: pxToRem(25),
  paddingLeft: pxToRem(100),
  transform: isCollapsed ? 'translate3d(-1rem,0,0)' : 'translate3d(0,0,0)',
  transition: isCollapsed
    ? 'background-color 200ms ease, opacity 200ms ease, transform 200ms ease 200ms'
    : 'background-color 200ms ease, opacity 200ms ease 200ms, transform 200ms ease 200ms',
  opacity: isCollapsed ? 0 : 1,
  pointerEvents: isCollapsed ? 'none' : 'auto',

  ':hover': {
    backgroundColor: Color.Secondary
  }
}))

const NavigationInnerAddressBlockStyle = cssRule({
  padding: pxToRem(25),
  paddingLeft: pxToRem(60),
  display: 'flex'
})

const LinkStyles = cssRule({
  transition: 'color 200ms ease',

  '&:hover': {
    color: Color.PrimaryDark
  }
})

const SmallLinkStyles = cssRule({
  display: 'block',
  fontSize: pxToRem(12),
  marginBottom: pxToRem(12)
})

const TriggerWrapperStyle = cssRule({
  position: 'absolute',
  right: pxToRem(20),
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none'
})

// TODO: Fix Wrapper blocking logo link
const TriggerStyle = cssRule<NavigationBarStyleProps>(({isCollapsed}) => ({
  width: pxToRem(30),
  height: pxToRem(20),
  position: 'relative',
  left: 0,
  cursor: 'pointer',
  transition: 'transform 200ms ease',

  ...whenDesktop({
    transform: isCollapsed ? 'translate3d(11px, 50px, 0)' : 'translate3d(0, 0, 0)'
  }),

  '&::after': {
    content: '" "',
    position: 'absolute',
    left: 0,
    bottom: '2px',
    width: '100%',
    height: '2px',
    backgroundColor: Color.Black,
    transform: isCollapsed
      ? 'rotate(0) translate3d(0,0,0)'
      : 'rotate(-45deg) translate3d(5px,-5px,0)',
    transition: 'bottom 200ms ease, transform 200ms ease'
  },

  '&::before': {
    content: '" "',
    position: 'absolute',
    left: 0,
    top: '2px',
    width: '100%',
    height: '2px',
    backgroundColor: Color.Black,
    transform: isCollapsed
      ? 'rotate(0) translate3d(0,0,0)'
      : 'rotate(45deg) translate3d(5px,5px,0)',
    transition: 'top 200ms ease, transform 200ms ease'
  },

  '&:hover::after': {
    bottom: isCollapsed ? '4px' : '2px'
  },

  '&:hover::before': {
    top: isCollapsed ? '4px' : '2px'
  }
}))

const NavFooterWrapperStyle = cssRule({
  paddingLeft: pxToRem(20)
})

export interface NavigationBarProps {
  itemsCategory: NavigationItem[]
  itemsIntern: NavigationItem[]
}

export function NavigationBar({itemsCategory, itemsIntern}: NavigationBarProps) {
  const [isCollapsed, setCollapsed] = useState(true)
  const css = useStyle({isCollapsed})

  function onCollapse(collapse: boolean) {
    setCollapsed(collapse)

    if (collapse) {
      document.body.style.paddingRight = ''
      document.documentElement.style.overflow = ''
    } else {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.paddingRight = collapse ? '' : `${scrollbarWidth}px`
      document.documentElement.style.overflow = collapse ? '' : 'hidden'
    }
  }

  return (
    <div className={css(NavigationBarStyle)}>
      <div className={css(NavigationBarHeaderStyle)}>
        <Link route={PageRoute.create({})}>
          <LogoButton />
        </Link>
        <div className={css(NavigationBarFiller)} />
        <Interactable
          onClick={() => {
            onCollapse(!isCollapsed)
          }}
          className={css(TriggerWrapperStyle)}>
          <div className={css(TriggerStyle)}></div>
        </Interactable>
      </div>

      <div className={css(NavigationBackgroundStyle)}>
        {!!itemsCategory.length && (
          <>
            <NavigationBarDivider />
            <div className={css(CategoriesStyle, NavigationInnerBlockStyle)}>
              {itemsCategory.map((item, index) => (
                <div key={index}>
                  <Link
                    className={css(LinkStyles)}
                    target={item.url ? '_blank' : '_self'}
                    route={item.route}
                    href={item.url}
                    onClick={e => {
                      onCollapse(true)
                    }}>
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
        <NavigationBarDivider />
        <div className={css(NavigationInnerBlockStyle)}>

          {itemsIntern.map((item, index) => (
            <div key={index}>
              <Link
                className={css(LinkStyles, SmallLinkStyles)}
                route={item.route}
                onClick={e => {
                  onCollapse(true)
                }}>
                {item.title}
              </Link>
            </div>
          ))}
        </div>
        <NavigationBarDivider />
        <div className={css(NavigationSocialMediaStyle, NavigationInnerBlockStyle)}>
          <Link target="_blank" rel="noopener" href="https://www.facebook.com/therealkultz">
            <RoundIconButton icon={IconType.Facebook}></RoundIconButton>
          </Link>
          <Link target="_blank" rel="noopener" href="https://www.instagram.com/kultz.ch/">
            <RoundIconButton icon={IconType.Instagram}></RoundIconButton>
          </Link>
          <Link target="_blank" rel="noopener" href="https://twitter.com/kultzc">
            <RoundIconButton icon={IconType.Twitter}></RoundIconButton>
          </Link>
          <Link href="mailto:redaktion@kultz.ch">
            <RoundIconButton icon={IconType.Mail}></RoundIconButton>
          </Link>
        </div>
        <NavigationBarDivider />
        <div className={css(NavigationInnerBlockStyle, NavigationInnerAddressBlockStyle)}>
          <div className={css(NavigationLogoStyle)}>
            <SmallLogo />
          </div>
          <div className={css(NavFooterWrapperStyle)}>
            <Link className={css(LinkStyles)} route={PageRoute.create({})}>
              <strong>Kultz</strong>
            </Link>
            <div>Verein «Der Verleg»</div>
            <div>Zentralstrasse 30</div>
            <div>6003 Luzern</div>
            <Link href="mailto:redaktion@kultz.ch">redaktion@kultz.ch</Link>
          </div>
        </div>
      </div>
      <Interactable
        onClick={() => onCollapse(!isCollapsed)}
        className={css(BackgroundTriggerStyle)}></Interactable>
    </div>
  )
}

const NavigationBarDividerStyle = cssRule({
  backgroundColor: Color.White,
  height: pxToRem(1),
  width: '100%'
})

export function NavigationBarDivider() {
  const css = useStyle()
  return <div className={css(NavigationBarDividerStyle)} />
}
