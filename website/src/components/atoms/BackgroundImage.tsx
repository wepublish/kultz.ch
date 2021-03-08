import styled from 'styled-components'

interface BackgroundImageInterface {
  src: string
  height?: string
  maxHeight?: string
  width?: string
  // TODO: should be from enum
  backgroundSize?: string
  backgroundPosition?: string
}

const BackgroundImage = styled.div((props: BackgroundImageInterface) => ({
  backgroundImage: `url(${props?.src})`,
  height: props?.height ?? 'auto',
  maxHeight: props?.maxHeight ?? 'auto',
  width: props?.width ?? '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: props?.backgroundSize ?? 'cover',
  backgroundPosition: props?.backgroundPosition ?? 'center'
}))

export default BackgroundImage
