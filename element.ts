import { Attributes } from './attributes.ts'
import { TagName, selfClosingTags } from './tagname.ts'

export type Element = {
  tagName: TagName,
  attributes: Attributes,
  children: Element[] | string
}

export const createElement = (tagName: TagName, attributes: Attributes = {}, children: Element[] | string = []): Element => {
  return { tagName, attributes, children }
}

export const element = createElement

export const toHTML = (element: Element): string => {
  const html = outerHTML(element)
  return (element.tagName === 'html') ? `<!doctype html>${html}` : html
}

const outerHTML = (element: Element): string => {
  if (selfClosingTags.includes(element.tagName)) {
    return openingTag(element.tagName, element.attributes)
  } else {
    const innerHTML = typeof element.children === 'string'
      ? element.children
      : element.children.map(toHTML).join('')
    return `${openingTag(element.tagName, element.attributes)}${innerHTML}${closingTag(element.tagName)}`
  }
}

const openingTag = (tagName: TagName, attributes: Attributes = {}): string => {
  let result = `<${tagName}`
  for (const [key, value] of Object.entries(attributes)) {
    switch (key) {
      case 'className':
        result += ` class="${value}"`
        break
      case 'style':
        // TODO
        // result += ` style="${cssText(attributes.style)}"`
        break
      default:
        result += (typeof value === 'boolean')
          ? ` ${key}`
          : ` ${key}="${value.replace(/"/g, '\'').replace(/\n/g, '').trim()}"`
        break
    }
  }
  result += '>'
  return result
}

const closingTag = (tagName: TagName): string => {
  return `</${tagName}>`
}
