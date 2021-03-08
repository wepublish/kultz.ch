import styled from 'styled-components'
import BackgroundImage from './BackgroundImage'
import Link from 'next/link'

const Date = styled.p`
  margin: 10px 0px;
`

const Authors = styled.p`
  span {
    ::after {
      content: ', ';
    }
    :last-child::after {
      content: '';
    }
  }
`

function ArticleTeaser({date, title, image, href, authors, ...rest}) {
  return (
    <Link href={href}>
      <div className={`${rest.className} hover:text-tsri `}>
        <BackgroundImage
          backgroundSize="cover"
          maxHeight="370px"
          height="370px"
          width="100%"
          src={image?.url}
        />
        <Date>{date}</Date>
        <h2>{title}</h2>
        <Authors>
          von {authors.length ? authors.map(({name}, i) => <span key={i}>{name}</span>) : 'Tsüri'}
        </Authors>
      </div>
    </Link>
  )
}

const StyledArticleTeaser = styled(ArticleTeaser)`
  overflow: hidden;
  word-break: break-all;
`

export default StyledArticleTeaser
