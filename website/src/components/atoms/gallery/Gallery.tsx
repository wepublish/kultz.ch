import Slider from './Slider'
import BackgroundImage from 'components/atoms/BackgroundImage'
import {ImageData} from 'components/types'

interface GalleryProps {
  media: ImageData[]
  loop?: boolean
}

const responsive = [
  // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  {breakPoint: 1280, cardsToShow: 4},
  {breakPoint: 760, cardsToShow: 2}
]

export const Gallery = ({media}: GalleryProps) => (
  <Slider responsive={responsive} showArrows showDots infinite scaleOnFocus={5}>
    {media.map(({url}) => (
      <div key={url} style={{margin: 'auto 20px'}}>
        <BackgroundImage src={url} height="500px" />
      </div>
    ))}
  </Slider>
)

export default Gallery
