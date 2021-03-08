import styled from 'styled-components'
import BackgroundImage from './BackgroundImage'

function EventAtom({date, title, image, href, authors=[], ...rest}) {
  return (
    <div className={rest.className}>
      <BackgroundImage
        backgroundSize="cover"
        maxHeight="370px"
        height="370px"
        width="100%"
        src={image?.url}
      />
      <div id="art-date">{`${new Date(date).toDateString()}`}</div>
      <h2>{title}</h2>
      <p id="art-authors">
        von {authors.length ? authors.map(({name}) => <span>{name}</span>) : 'Tsüri'}
      </p>
    </div>
  )
}

const StyledEventAtom = styled(EventAtom)`
  color: black;
  #art-date {
    margin: 10px 0px;
  }
  #art-authors {
    span {
      ::after {
        content: ', ';
      }
      :last-child::after {
        content: '';
      }
    }
  }
`

export default StyledEventAtom
