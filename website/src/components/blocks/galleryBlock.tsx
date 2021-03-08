import React, {useState} from 'react'
import {Gallery} from 'components/atoms/gallery/Gallery'
import {ImageData} from '../types'

export interface GalleryBlockProps {
  readonly media: ImageData[]
  readonly loop?: boolean
}

export function GalleryBlock({media, loop}: GalleryBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setFullscreen] = useState(false)

  return (
    <Gallery media={media} loop={loop} />
    // <Gallery
    //   maxImageWidth={600}
    //   aspectRatio={16 / 9}
    //   currentIndex={currentIndex}
    //   media={media}
    //   fullscreen={isFullscreen}
    //   onFullscreenToggle={() => setFullscreen(!isFullscreen)}
    //   onIndexChange={setCurrentIndex}
    //   loop={loop}
    // />
  )
}
