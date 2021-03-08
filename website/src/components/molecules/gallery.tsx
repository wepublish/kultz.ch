import React, {useRef, useEffect, useState, useLayoutEffect} from 'react'

import {FullscreenOverlayWrapper} from '../atoms/fullscreenOverlayWrapper'
import {IconType, BlockIcon} from '../atoms/icon'

import {ZIndex, desktopMediaQuery, pxToRem, whenTablet, whenDesktop} from '../../../styles/helpers'
import {BaseButton} from '../atoms/baseButton'
import {Color} from '../../../styles/colors'
import {ImageData} from '../types'
import {usePermanentVisibility} from '../utils/hooks'
import styled, {css} from 'styled-components'

interface GalleryStyleProps {
  readonly isFullscreen: boolean
}

interface GalleryWrapperStyleProps {
  readonly isFullscreen: boolean
  readonly showBackground: boolean
}

const previewPeekPercentage = 0.1

const BaseStaticGallery = styled.div`
  height: ${(props: {imageHeight: number}) => props.imageHeight}px;
  &img {
    display: none;
  }
`

const GalleryWrapper = styled.div`
  ${(props: GalleryWrapperStyleProps) =>
    css`
      opacity: ${props.showBackground ? 1 : 0};
      transform: ${props.showBackground ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)'};
      transition: opacity 500ms ease, transform 700ms ease;
      width: ${props.isFullscreen ? '100%' : undefined};
      height: ${props.isFullscreen ? '100%' : undefined};
    `}
`
const GalleryContainer = styled.div`
  ${(props: GalleryStyleProps) =>
    css`
      background-color: ${props.isFullscreen ? Color.Black : Color.White};
      position: relative;
      padding: ${pxToRem(15)};
      margin-bottom: ${pxToRem(50)};
      width: 100%;
      height: 100%;
    `}
`

const GalleryImageWrapperStyle = styled.div((props: any) => ({
  ...whenTablet({
    width: props.isFullscreen ? '100%' : '75%',
    position: 'absolute',
    left: '50%',
    transform: 'translate3d(-50%,0,0)',
    height: '100%',
    zIndex: 1
  }),

  ...whenDesktop({
    width: props.isFullscreen ? '100%' : '75%',
    position: 'absolute',
    left: '50%',
    transform: 'translate3d(-50%,0,0)',
    height: '100%',
    zIndex: 1
  })
}))

const GalleryCaptionContainer = styled.div((props: any) => ({
  margin: '0 auto',
  backgroundColor: Color.White,
  ...(props.isFullscreen
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
        // pointerEvents: 'none',
      }
    : {}),

  ...whenTablet({
    zIndex: 2,
    marginTop: props.isFullscreen ? 0 : pxToRem(15),

    ...(props.isFullscreen
      ? {
          height: pxToRem(60),
          top: 'auto',
          bottom: 0,
          width: '50%',
          left: '50%',
          transform: 'translate3d(-50%,0,0)'
        }
      : {})
  }),

  ...whenDesktop({
    zIndex: 2,
    marginTop: props.isFullscreen ? 0 : pxToRem(15),

    ...(props.isFullscreen
      ? {
          height: pxToRem(60),
          top: 'auto',
          bottom: 0,
          width: '50%',
          left: '50%',
          transform: 'translate3d(-50%,0,0)'
        }
      : {})
  })
}))

const GalleryCaption = styled.div((props: any) => ({
  fontSize: pxToRem(14),
  // textAlign: 'center',
  padding: `${pxToRem(10)} 0`,
  // pointerEvents: 'auto',
  ...(props.isFullscreen
    ? {
        padding: `${pxToRem(10)} ${pxToRem(25)}`,
        backgroundColor: Color.White,
        // position: 'absolute',
        bottom: 0,
        width: '100%'
      }
    : {}),

  ...whenTablet({
    padding: `${pxToRem(22)} ${pxToRem(60)}`,
    fontSize: pxToRem(12)
  }),

  ...whenDesktop({
    padding: `${pxToRem(22)} ${pxToRem(60)}`,
    fontSize: pxToRem(12)
  })
}))

const GalleryNavigationButton = styled.div(() => ({
  // position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translate3d(0,-50%,0)',

  zIndex: ZIndex.Overlay,
  backgroundColor: Color.White,
  fontSize: pxToRem(32),
  opacity: 1,
  transition: 'opacity 50ms ease-in',

  ':disabled': {
    opacity: 0
  },

  ':last-of-type': {
    right: 0,
    left: 'auto'
  },

  ...whenTablet({
    width: pxToRem(60),
    height: pxToRem(60),
    border: `1px solid ${Color.Secondary}`,
    transition: 'border-color 200ms ease',

    ':hover': {
      borderColor: Color.PrimaryDark
    },

    '> div > svg': {
      width: pxToRem(58),
      height: pxToRem(58)
    }
  }),

  ...whenDesktop({
    width: pxToRem(60),
    height: pxToRem(60),
    border: `1px solid ${Color.Secondary}`,
    transition: 'border-color 200ms ease',

    ':hover': {
      borderColor: Color.PrimaryDark
    },

    '> div > svg': {
      width: pxToRem(58),
      height: pxToRem(58)
    }
  })
}))

const GalleryFullscreenButton = styled.div((props: any) => ({
  width: pxToRem(30),
  height: pxToRem(30),
  backgroundColor: Color.White,
  // position: 'absolute',
  right: 0,
  top: props.isFullscreen ? 0 : '-30px',
  cursor: 'pointer',
  // pointerEvents: 'auto',

  '> div > svg': {
    width: pxToRem(30),
    height: pxToRem(30)
  },

  ...(props.isFullscreen
    ? {
        width: pxToRem(60),
        height: pxToRem(60),

        '> div > svg': {
          width: pxToRem(60),
          height: pxToRem(60)
        }
      }
    : {}),

  ...whenTablet({
    top: 0,
    width: pxToRem(60),
    height: pxToRem(60),

    '> div > svg': {
      width: pxToRem(60),
      height: pxToRem(60)
    }
  }),

  ...whenDesktop({
    top: 0,
    width: pxToRem(60),
    height: pxToRem(60),

    '> div > svg': {
      width: pxToRem(60),
      height: pxToRem(60)
    }
  })
}))

const GalleryScrollContainer = styled.div`
  ${(props: {imageHeight: number; isFullscreen: boolean}) => css`
    position: relative;
    width: 100%;
    overflow: hidden;
    height: ${props.isFullscreen ? '100%' : `${props.imageHeight}px`};
  `}
`

const GalleryScrollWrapper = styled.div`
  position: relative;
  height: 100%;
`

interface GalleryImageStyleProps {
  readonly isFullscreen: boolean
}

const BaseGalleryImage = styled.img`
  ${(props: GalleryImageStyleProps) => css`
    position: absolute;
    margin: 0 15px;
    top: 0;
    left: 0;
    object-fit: ${props.isFullscreen ? 'contain' : 'cover'};
  `}
`

export interface GalleryProps {
  maxImageWidth: number
  aspectRatio: number

  currentIndex: number
  media: ImageData[]

  fullscreen?: boolean
  loop?: boolean

  onFullscreenToggle(): void
  onIndexChange(delta: number): void
}

export function Gallery(props: GalleryProps) {
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    setInteractive(true)
  }, [])

  return interactive ? <InteractiveGallery {...props} /> : <StaticGallery {...props} />
}

export function StaticGallery({maxImageWidth, aspectRatio, media}: GalleryProps) {
  const imageHeight = maxImageWidth / aspectRatio

  // TODO: Better SSR
  return (
    <BaseStaticGallery imageHeight={imageHeight}>
      {media.map(media => (
        <img key={media.url} src={media.url} />
      ))}
    </BaseStaticGallery>
  )
}

export function InteractiveGallery({
  aspectRatio,
  maxImageWidth,
  media,
  currentIndex,
  fullscreen: isFullscreen = false,
  loop: isLooping = false,
  onFullscreenToggle,
  onIndexChange
}: GalleryProps) {
  const ref = React.createRef<HTMLParagraphElement>()
  const show = usePermanentVisibility(ref, {threshold: 0})
  //const cssProps: GalleryStyleProps = {isFullscreen, showBackground: show}
  const cssProps: GalleryStyleProps = {isFullscreen}

  //TODO: remove this
  const showBackground = true
  const containerRef = useRef<HTMLDivElement>(null)

  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  const [isAnimating, setAnimating] = useState(false)
  const [isDesktop, setDesktop] = useState(false)

  const numMedia = media.length
  const currentMedia = media[currentIndex]

  const imageWidth = isFullscreen
    ? containerWidth
    : containerWidth > maxImageWidth
    ? maxImageWidth
    : containerWidth

  const imageHeight = isFullscreen ? containerHeight : imageWidth / aspectRatio

  function changeIndex(delta: number) {
    let newIndex = currentIndex + delta

    if (isLooping) {
      if (newIndex >= numMedia) {
        newIndex = 0
      }

      if (newIndex < 0) {
        newIndex = numMedia - 1
      }

      onIndexChange(newIndex)
    } else {
      if (newIndex >= 0 && newIndex < numMedia) {
        onIndexChange(newIndex)
      }
    }
  }

  useLayoutEffect(() => {
    setAnimating(true)
  }, [currentIndex])

  useLayoutEffect(() => {
    setContainerWidth(containerRef.current!.clientWidth)
    setContainerHeight(containerRef.current!.clientHeight)

    setAnimating(false)
    setDesktop(window.matchMedia(desktopMediaQuery).matches)
  }, [isFullscreen])

  useEffect(() => {
    function resizeCallback() {
      setContainerWidth(containerRef.current!.clientWidth)
      setContainerHeight(containerRef.current!.clientHeight)

      setAnimating(false)
    }

    function mediaQueryCallback(e: MediaQueryListEvent) {
      setDesktop(e.matches)
    }

    const mediaQuery = window.matchMedia(desktopMediaQuery)

    window.addEventListener('resize', resizeCallback)
    mediaQuery.addEventListener
      ? mediaQuery.addEventListener('change', mediaQueryCallback)
      : mediaQuery.addListener(mediaQueryCallback)

    return () => {
      window.removeEventListener('resize', resizeCallback)
      mediaQuery.removeEventListener
        ? mediaQuery.removeEventListener('change', mediaQueryCallback)
        : mediaQuery.removeListener(mediaQueryCallback)
    }
  }, [])

  return (
    <FullscreenOverlayWrapper isFullscreen={isFullscreen}>
      <GalleryWrapper ref={ref} isFullscreen={isFullscreen} showBackground={showBackground}>
        <GalleryContainer ref={containerRef} isFullscreen={isFullscreen}>
          <GalleryScrollContainer imageHeight={imageHeight} isFullscreen={isFullscreen}>
            <GalleryImageWrapperStyle>
              <GalleryNavigationButton>
                <BaseButton
                  cssProps={cssProps}
                  onClick={() => changeIndex(-1)}
                  disabled={!isLooping && currentIndex === 0}>
                  <BlockIcon type={IconType.Previous} />
                </BaseButton>

                <BaseButton
                  cssProps={cssProps}
                  onClick={() => changeIndex(+1)}
                  disabled={!isLooping && currentIndex === media.length - 1}>
                  <BlockIcon type={IconType.Next} />
                </BaseButton>
              </GalleryNavigationButton>
            </GalleryImageWrapperStyle>
            <GalleryScrollWrapper
              style={{
                transform: scrollTransformForIndex(
                  currentIndex,
                  imageWidth,
                  containerWidth,
                  isDesktop,
                  isFullscreen
                ),
                transitionProperty: 'transform',
                transitionTimingFunction: 'ease-in',
                transitionDuration: isAnimating ? '200ms' : '0ms'
              }}>
              {media.map((media, index) => (
                <GalleryImage
                  key={media.url}
                  index={index}
                  width={imageWidth}
                  height={imageHeight}
                  containerWidth={containerWidth}
                  fullscreen={isFullscreen}
                  desktop={isDesktop}
                  media={media}
                />
              ))}
            </GalleryScrollWrapper>
          </GalleryScrollContainer>
          <GalleryCaptionContainer
            style={{
              maxWidth: isFullscreen ? undefined : imageWidth,
              position: isFullscreen ? 'absolute' : 'relative'
            }}>
            <GalleryCaption
              style={{
                position: isFullscreen ? 'absolute' : 'relative'
              }}>
              {currentMedia.caption}
            </GalleryCaption>
            <GalleryFullscreenButton>
              <BaseButton cssProps={cssProps} onClick={() => onFullscreenToggle()}>
                <BlockIcon type={isFullscreen ? IconType.Minimize : IconType.Maximize} />
              </BaseButton>
            </GalleryFullscreenButton>
          </GalleryCaptionContainer>
        </GalleryContainer>
      </GalleryWrapper>
    </FullscreenOverlayWrapper>
  )
}

interface GalleryImageProps {
  index: number
  width: number
  height: number
  containerWidth: number
  desktop: boolean
  fullscreen: boolean
  media: ImageData
}

function GalleryImage({
  index,
  width,
  height,
  containerWidth,
  desktop: isDesktop,
  fullscreen: isFullscreen,
  media
}: GalleryImageProps) {
  return (
    <BaseGalleryImage
      key={media.url}
      src={media.url}
      isFullscreen={isFullscreen}
      style={{
        transform: imageTransformForIndex(index, width, containerWidth, isDesktop, isFullscreen),
        width,
        height
      }}
    />
  )
}

function imageTransformForIndex(
  index: number,
  imageWidth: number,
  containerWidth: number,
  isDesktop: boolean,
  isFullscreen: boolean
) {
  return `translate(${imageTranslationForIndex(
    index,
    imageWidth,
    containerWidth,
    isDesktop,
    isFullscreen
  )}px)`
}

function scrollTransformForIndex(
  index: number,
  imageWidth: number,
  containerWidth: number,
  isDesktop: boolean,
  isFullscreen: boolean
) {
  return `translate(${scrollTranslationForIndex(
    index,
    imageWidth,
    containerWidth,
    isDesktop,
    isFullscreen
  )}px)`
}

function imageTranslationForIndex(
  index: number,
  imageWidth: number,
  containerWidth: number,
  isDesktop: boolean,
  isFullscreen: boolean
) {
  return isDesktop && !isFullscreen
    ? index * (containerWidth / 2 + imageWidth * (0.5 - previewPeekPercentage))
    : index * imageWidth
}

function scrollTranslationForIndex(
  index: number,
  imageWidth: number,
  containerWidth: number,
  isDesktop: boolean,
  isFullscreen: boolean
) {
  return (
    -imageTranslationForIndex(index, imageWidth, containerWidth, isDesktop, isFullscreen) +
    containerWidth / 2 -
    imageWidth / 2
  )
}
