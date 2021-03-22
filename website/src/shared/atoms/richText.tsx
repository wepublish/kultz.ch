import React, {ReactNode, Fragment} from 'react'
import {Node} from 'slate'
import {cssRule, useStyle} from '@karma.run/react'

export const tableStyle = cssRule({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed'
})

export const tableCellStyle = cssRule({
  border: '1px solid',
  padding: '8px',
  // remove extra whitespace after paragraph inside of table-cell
  '> p, p': {
    marginBlockEnd: '0'
  }
})

export interface RichTextProps {
  readonly value: Node[]
}

export function RichText(props: RichTextProps) {
  return <div>{renderNodes(props.value)}</div>
}

export function renderNodes(nodes: Node[]): ReactNode {
  return nodes.map((node, index) => {
    const css = useStyle()
    if (node.children) {
      switch (node.type) {
        case 'heading-one':
          // @ts-ignore
          return <h1 key={index}>{renderNodes(node.children)}</h1>
        case 'heading-two':
          // @ts-ignore
          return <h2 key={index}>{renderNodes(node.children)}</h2>
        case 'heading-three':
          // @ts-ignore
          return <h3 key={index}>{renderNodes(node.children)}</h3>
        case 'unordered-list':
          // @ts-ignore
          return <ul key={index}>{renderNodes(node.children)}</ul>
        case 'ordered-list':
          // @ts-ignore
          return <ol key={index}>{renderNodes(node.children)}</ol>
        case 'list-item':
          // @ts-ignore
          return <li key={index}>{renderNodes(node.children)}</li>
        case 'table':
          // @ts-ignore
          return (
            <div key={index} style={{maxWidth: '100%', overflowX: 'auto'}}>
              <table className={css(tableStyle)} style={{display: 'block'}}>
                <tbody>{renderNodes(node.children)}</tbody>
              </table>
            </div>
          )
        case 'table-row':
          // @ts-ignore
          return <tr key={index}>{renderNodes(node.children)}</tr>
        case 'table-cell':
          // @ts-ignore
          return (
            <td key={index} className={css(tableCellStyle)} style={{borderColor: node.borderColor}}>
              {renderNodes(node.children)}
            </td>
          )
        case 'link':
          if (
            node.url &&
            (node.url.includes('mailto:') ||
              node.url.startsWith('https://bajour') ||
              node.url.startsWith('https://staging.bajour') ||
              node.url.startsWith('/'))
          ) {
            // @ts-ignore
            return (
              <a key={index} href={node.url} title={node.title}>
                {renderNodes(node.children)}
              </a>
            )
          } else {
            // @ts-ignore
            return (
              <a key={index} target="_blank" rel="noopener" href={node.url} title={node.title}>
                {renderNodes(node.children)}
              </a>
            )
          }
        default:
          // @ts-ignore
          return <p key={index}>{renderNodes(node.children)}</p>
      }
    } else {
      // @ts-ignore
      const splitText: string[] = node.text.split('\n')

      let element = (
        <>
          {splitText.length > 1
            ? splitText.map((text, index) => (
              <Fragment key={index}>
                {text}
                {index !== splitText.length - 1 ? <br /> : null}
              </Fragment>
            ))
            : splitText}
        </>
      )

      if (node.bold) {
        element = <strong>{element}</strong>
      }

      if (node.italic) {
        element = <em>{element}</em>
      }

      if (node.underline) {
        element = <u>{element}</u>
      }

      if (node.strikethrough) {
        element = <del>{element}</del>
      }

      return <React.Fragment key={index}>{element}</React.Fragment>
    }
  })
}
