import React from 'react'
import styled, {css} from 'styled-components'
import {Color} from '../../../styles/colors'
import {pxToRem, tabletMediaQuery, desktopMediaQuery} from '../../../styles/helpers'
import {HeaderType, Author} from '../types'
import {TitleBlockBreaking} from './titleBlockBreaking'
import {getHumanReadableTimePassed, getReadableDate} from '../utility'
import {usePermanentVisibility} from '../utils/hooks'
import {MobileSocialMediaButtons} from '../atoms/socialMediaButtons'
import AuthorDetails from '../atoms/AuthorDetails'
import LineSeparator from '../atoms/LineSeparator'

export const TitleBlock = styled(BaseTitleBlock)`
  ${() =>
    css`
      padding-top: ${pxToRem(30)};
      padding-bottom: ${pxToRem(40)};
      margin-bottom: ${pxToRem(70)};
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: opacity 500ms ease, transform 700ms ease;
    `}
`

export const TitleInnerBlock = styled.div`
  ${() =>
    css`
      max-width: ${pxToRem(1200)};
      margin: 0 auto;
      padding: ${pxToRem(25)};
      width: 100%;

      @media ${tabletMediaQuery} {
        width: 75%;
      }
    `}
`
const Title = styled.h1`
  ${() =>
    css`
      font-weight: normal;
      font-size: ${pxToRem(30)};
      margin-top: 0;
      margin-bottom: 3rem;

      @media ${tabletMediaQuery} {
        font-size: ${pxToRem(55)};
      }
      @media ${desktopMediaQuery} {
        font-size: ${pxToRem(55)};
      }
    `}
`

const TextAtom = styled.p`
  font-weight: normal;
  font-size: ${pxToRem(18)};
  margin-top: 0;
  margin-bottom: 1em;

  @media ${tabletMediaQuery} {
    font-size: ${pxToRem(24)};
  }

  @media ${desktopMediaQuery} {
    font-size: ${pxToRem(24)};
  }
`

const PreTitleAtom = styled.p`
  font-weight: normal;
  font-size: ${pxToRem(18)};
  margin-top: 0;
  margin-bottom: 1em;

  @media ${tabletMediaQuery} {
    font-size: ${pxToRem(24)};
  }

  @media ${desktopMediaQuery} {
    font-size: ${pxToRem(24)};
  }
`

const AuthorContainer = styled.div`
  > a: {
    text-decoration: underline;
    transition: color 200ms ease;

    &:hover: {
      color: ${Color.Black};
    }
  }
`
const Tag = styled.span`
  border: 1px solid;
  border-radius: 25px;
  padding: ${pxToRem(3)};
  margin: ${pxToRem(3)};

  :before {
    content: '#';
  }
`
export interface TitleBlockDefaultProps {
  preTitle?: string
  title: string
  lead?: string
  authors?: Author[]
  publishedAt?: Date
  updatedAt?: Date
  showSocialMediaIcons?: boolean
  shareUrl: string
  isPeerArticle: boolean
  className?: string
  tags?: string[]
}

export function BaseTitleBlock({type, ...props}: TitleBlockDefaultProps & {type: HeaderType}) {
  switch (type) {
    default:
    case HeaderType.Default:
      return <TitleBlockDefault {...props} />

    case HeaderType.Breaking:
      return <TitleBlockBreaking {...props} />
  }
}

export function TitleBlockDefault({
  preTitle,
  title,
  lead,
  authors,
  publishedAt,
  updatedAt,
  showSocialMediaIcons = false,
  shareUrl,
  isPeerArticle,
  className,
  tags
}: TitleBlockDefaultProps) {
  const ref = React.createRef<HTMLParagraphElement>()
  // const show = usePermanentVisibility(ref, {threshold: 0})
  const showUpdatedAt = publishedAt?.getTime() != updatedAt?.getTime()

  return (<p>Titel block</p>)

  /* return (
    <div ref={ref} className={className}>
      <Grid mx="auto" gap="1%" cols={{xs: 1, md: 4}} justifyContent="center" paddingLeft="3rem">
        <Cell x-span={{xs: '2', md: '1'}}>
          <AuthorContainer>
            {authors?.length
              ? authors.map<React.ReactNode>(author => (
                  <>
                    {isPeerArticle ? (
                      <div key={author.name}>{author.name}</div>
                    ) : (
                      <AuthorDetails
                        key={author.name}
                        name={author.name}
                        imageSrc={author?.image?.mediumTeaserURL}
                        links={author.links}
                        bio={author.bio}
                      />
                    )}
                    <LineSeparator
                      borderColor={Color.LightGray}
                      margin={12}
                      width="20%"
                      marginBottom={25}
                    />
                  </>
                ))
              : null}
            <p>{publishedAt && getReadableDate(publishedAt)}</p>
          </AuthorContainer>
          <LineSeparator borderColor={Color.LightGray} margin={12} width="20%" marginBottom={15} />
          <p>{tags?.length ? tags?.map(tag => <Tag>{tag}</Tag>) : null}</p>
        </Cell>
        <Cell x-span={{xs: '2', md: '3'}}>
          <TitleInnerBlock>
            {preTitle && <PreTitleAtom>{preTitle}</PreTitleAtom>}
            <Title>{title}</Title>
            {lead && <TextAtom>{lead}</TextAtom>}
            <p>
              {showUpdatedAt && updatedAt && (
                <>Aktualisiert {getHumanReadableTimePassed(updatedAt)}</>
              )}
            </p>
          </TitleInnerBlock>
        </Cell>
      </Grid>
      {showSocialMediaIcons && <MobileSocialMediaButtons shareUrl={shareUrl} />}
    </div>
  ) */
}
