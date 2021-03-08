import React from 'react'
import {Peer} from '../types'
import {Tag} from './tag'
// import {Link, TagRoute} from '../route/routeContext'
import styled from 'styled-components'

const BaseTagList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -10px;
`
export interface TagListProps {
  peer?: Peer
  tags?: string[]
}

export function TagList({peer, tags}: TagListProps) {
  return (
    <BaseTagList>
      {peer && (
        // <Link href={peer.websiteURL}>
        <Tag iconURL={peer.logoURL} title={new URL(peer.websiteURL).hostname} />
        // </Link>
      )}
      {tags.length
        ? tags.map(tag => (
            // <Link key={tag} route={TagRoute.create({tag: tag})}>
            <Tag key={tag} title={tag} />
            // </Link>
          ))
        : null}
    </BaseTagList>
  )
}
