import {Color} from '../../../styles/colors'
import Link from 'next/link'
import styled from 'styled-components'
import {RoundImage} from './roundImage'
import {FacebookIcon, TwitterIcon} from './icon'

const AuthorName = styled.a`
  color: ${Color.Primary};
`
const AuthorSocialMediaIcon = styled.a`
  height: 35px;
  width: 35px;
  display: inline-flex;
  border-radius: 20px;
  border: 1px solid black;
  justify-content: center;
  padding: 7px;
`

export function AuthorDetails({bio, links, name, imageSrc}: any) {
  return (<p>Author details</p>)
  /*return (
    <address>
      <Grid
        width="22vw"
        mx="auto"
        gap="2%"
        rowGap="20px"
        cols={{xs: 5}}
        justifyContent="center"
        justifyItems="start"
        alignItems="center">
        <Cell y-offset="1" y-span="3" style={{alignSelf: 'start'}}>
          <RoundImage width={50} height={50} src={imageSrc} />
        </Cell>
        <Cell y-span="3" x-span={{xs: '4'}}>
          {'Geschrieben Von '}
          <Link href="" passHref>
            <AuthorName>{name}</AuthorName>
          </Link>
        </Cell>
        <Cell x-offset={{xs: '2'}}>
          <Grid justifyItems="start" alignItems="start" columnGap="15%" cols={5}>
            {links.length
              ? links.map(({url}, i) => (
                  <Cell key={i}>
                    <AuthorSocialMediaIcon href={url} target="_blank">
                      {!!url.match(/twitter/) ? (
                        <TwitterIcon />
                      ) : !!url.match(/facebook/) ? (
                        <FacebookIcon />
                      ) : null}
                    </AuthorSocialMediaIcon>
                  </Cell>
                ))
              : null}
          </Grid>
        </Cell>
      </Grid>
    </address>
  )*/
}

export default AuthorDetails
