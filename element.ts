import { TagName, selfClosingTags } from './tags.ts'
import { StyleDeclaration } from './style_declaration.ts'
import { TokenList } from './token_list.ts'

/** Creates an HTML Element of the given type, with the given options. */
export function element (tagName: TagName, options: any = {}): Element {
  return new Element(tagName, options)
}

/** A pseudo HTML Element. */
export class Element {
  tagName: TagName
  children: (Element|string)[]
  style: StyleDeclaration
  classList: TokenList
  attributes: Record<string, string|boolean>

  constructor (tagName: TagName, options: any = {}) {
    this.tagName = tagName
    this.children = []
    this.style = new StyleDeclaration()
    this.classList = new TokenList()
    this.attributes = {}
    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case 'tagName': // fallthrough
        case 'classList':
          break
        case 'children':
          if (Array.isArray(options.children)) {
            for (const child of options.children) {
              if ((child instanceof Element) || (typeof child === 'string')) {
                this.children.push(child)
              }
            }
          }
          break
        case 'innerHTML':
          if (typeof options.innerHTML === 'string') {
            this.innerHTML = options.innerHTML
          }
          break
        case 'style':
          for (const [key, value] of Object.entries(options.style)) {
            if (typeof value === 'string') {
              this.style.setProperty(key, value)
            }
          }
          break
        case 'class': // fallthrough
        case 'className':
          if (typeof value === 'string') {
            for (const className of value.split(' ')) {
              this.classList.add(className)
            }
          } else if(Array.isArray(value)) {
            for (const className of value) {
              this.classList.add(className)
            }
          }
          break
        default:
          if (typeof value === 'string' || typeof value === 'boolean') {
            this.attributes[key] = value
          }
      }
    }
  }

  get className (): string {
    return this.classList.value
  }

  get id (): string|undefined {
    return this.attributes.id?.toString()
  }

  get title (): string|undefined {
    return this.attributes.title?.toString()
  }

  get innerHTML (): string {
    return this.children.map(x => x.toString()).join('')
  }

  get openingTag (): string {
    let result = `<${this.tagName}`
    if (this.className.length > 0) {
      result += ` class="${this.className}"`
    }
    if (this.style.cssText.length > 0) {
      result += ` style="${this.style.cssText}"`
    }
    for (const [key, value] of Object.entries(this.attributes)) {
      result += (typeof value === 'boolean')
        ? ` ${key}`
        : ` ${key}="${value.replace(/"/g, '\'').replace(/\n/g, '').trim()}"`
    }
    result += '>'
    return result
  }

  get closingTag (): string {
    return `</${this.tagName}>`
  }

  get outerHTML (): string {
    if (this.innerHTML.length > 0) {
      return this.openingTag + this.innerHTML + this.closingTag
    }
    if (selfClosingTags.includes(this.tagName)) {
      return this.openingTag
    }
    return this.openingTag + this.closingTag
  }

  set innerHTML (innerHTML: string) {
    this.children = [innerHTML]
  }

  getAttribute(key: string): string|boolean|undefined {
    return this.attributes[key]
  }

  setAttribute(key: string, value: string|boolean) {
    this.attributes[key] = value
  }

  toString (): string {
    return (this.tagName === 'html')
      ? '<!doctype html>' + this.outerHTML
      : this.outerHTML
  }
}
