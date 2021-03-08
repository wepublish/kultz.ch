import { jsx } from 'slate-hyperscript'
import {JSDOM} from 'jsdom'

const ELEMENT_TAGS = {
  A: (el: any) => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: (el: any) => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
  SUB: () => ({ subscript: true })
}

const checkIfChildNodesHaveElementTags = (childNodes: any): boolean => {
  if(!childNodes || childNodes.length < 1) return false
  return Array.from(childNodes).some((child: any) => {
    // @ts-ignore
    return ELEMENT_TAGS[child.nodeName] || checkIfChildNodesHaveElementTags(child.childNodes)
  })
}


// @ts-ignore
const dom = new JSDOM(`<!DOCTYPE html><body></body></html>`)

const attachTextTagToTextNode = (childNodes: any, node: any) => {
  for(let i=0;i<childNodes.length;i++) {
    const child = childNodes[i]
    if(child.nodeName === '#text') {
      //const parent = child.parentNode
      const newNode = node.cloneNode(false)
      const newChildNode = child.cloneNode(true)
      newNode.append(newChildNode)
      console.log('newNode', newNode.childNodes)
      child.replaceWith(newNode)
    } else {
      attachTextTagToTextNode(child.childNodes, node)
    }
  }
}

export const reorderHTML = (el: any): any => {

  // @ts-ignore
  if(TEXT_TAGS[el.nodeName] && checkIfChildNodesHaveElementTags(el.childNodes)) {
    // const span = dom.window.document.createElement('span')
    // el.appendChild(span)
    const children: any[] = []
    const elClone = el.cloneNode(false)
    for(let i=0;i<el.childNodes.length;i++) {
      children.push(el.childNodes[i])
    }
    const parent = el.parentNode
    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }

    for(let i=0;i<children.length;i++){
      parent.appendChild(children[i])
    }
    attachTextTagToTextNode(parent.childNodes, elClone)

    for(let i=0; i< parent.childNodes.length; i++) {
      reorderHTML(parent.childNodes[i])
    }
  } else {
    for(let i=0; i< el.childNodes.length; i++) {
      reorderHTML(el.childNodes[i])
    }
  }
}

export const deserialize = (el: any): any => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  } else if (el.nodeName === 'BR') {
    return '\n'
  }

  const { nodeName } = el
  let parent = el

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0]
  }
  const children = Array.from(parent.childNodes)
    .map((somethin: any) => {
      if(el.nodeName === 'BODY' && somethin.nodeName === '#text') {
        return jsx('element', { type: 'paragraph' }, [somethin.textContent])
      }
      // @ts-ignore
      if(TEXT_TAGS[somethin.nodeName] && checkIfChildNodesHaveElementTags(somethin.childNodes)) {
        console.log('Got more than text in text node', somethin.nodeName)
        return Array.from(somethin.childNodes).map((somethin2: any) => {

          //if(somethin2.nodeName === '#text') return deserialize(somethin2)

          /* const newNode = somethin.cloneNode(false)
          Array.from(somethin2.childNodes).map((chill: any) => {
            newNode.appendChild(chill)
          })
          const fakeNode = somethin2.cloneNode(false)
          fakeNode.appendChild(newNode) */
          return deserialize(somethin2)
        }).flat()

      }
      return deserialize(somethin)
    })
    .flat()

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }

  // @ts-ignore
  if (ELEMENT_TAGS[nodeName]) {
    // @ts-ignore
    const attrs = ELEMENT_TAGS[nodeName](el)
    return jsx('element', attrs, children)
  }

  // @ts-ignore
  if (TEXT_TAGS[nodeName]) {
    // @ts-ignore
    const attrs = TEXT_TAGS[nodeName](el)

    return children.map((child: any) => {
      try {
        return jsx('text', attrs, child)
      } catch(error) {
        console.log('everything', children, nodeName, el)
        console.log('attrs', attrs)
        console.log('child', child)
        throw error
      }

    })
  }

  return children
}
