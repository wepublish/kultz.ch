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
      const children = node.children as Node[]
      switch (node.type) {
        case 'heading-one':
          return <h1 key={index}>{renderNodes(children)}</h1>
        case 'heading-two':
          return <h2 key={index}>{renderNodes(children)}</h2>
        case 'heading-three':
          return <h3 key={index}>{renderNodes(children)}</h3>
        case 'unordered-list':
          return <ul key={index}>{renderNodes(children)}</ul>
        case 'ordered-list':
          return <ol key={index}>{renderNodes(children)}</ol>
        case 'list-item':
          return <li key={index}>{renderNodes(children)}</li>
        case 'table':
          return (
            <div key={index} style={{maxWidth: '100%', overflowX: 'auto'}}>
              <table className={css(tableStyle)} style={{display: 'block'}}>
                <tbody>{renderNodes(children)}</tbody>
              </table>
            </div>
          )
        case 'table-row':
          return <tr key={index}>{renderNodes(children)}</tr>
        case 'table-cell':
          return (
            <td key={index} className={css(tableCellStyle)} style={{borderColor: (node.borderColor as string)}}>
              {renderNodes(children)}
            </td>
          )
        case 'link':
          if (
            node.url &&
            (node.url as string).includes('mailto:') ||
              (node.url as string).startsWith('https://kultz') ||
              (node.url as string).startsWith('/')
          ) {
            return (
              <a key={index} href={node.url as string} title={node.title as string}>
                {renderNodes(children)}
              </a>
            )
          } else {
            return (
              <a key={index} target="_blank" rel="noopener" href={node.url as string} title={node.title as string}>
                {renderNodes(children)}
              </a>
            )
          }
        default:
          return <p key={index}>{renderNodes(children)}</p>
      }
    } else {
      const splitText: string[] = (node.text as string).split('\n')

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
