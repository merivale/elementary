export class Element {
  tagName: TagName
  attr: Record<string, boolean|string>
  children: Element[]
  inner: string

  constructor (tagName: TagName, options: any = {}) {
    this.tagName = tagName
    this.attr = {}
    this.children = []
    this.inner = ''

    for (const key of Object.keys(options)) {
      switch (key) {
        case 'css':
          if (typeof options.css === 'object') {
            this.attr.style = ''
            for (const cssKey of Object.keys(options.css)) {
              this.attr.style += `${cssKey}:${options.css[cssKey]};`
            }
          }
          break

        case 'children':
          if (options.children && Array.isArray(options.children)) {
            this.children = options.children
          }
          break

        case 'innerHTML':
          if (options.innerHTML && typeof options.innerHTML === 'string')
          this.inner = options.innerHTML
          break

        default:
          if (typeof options[key] === 'string' || typeof options[key] === 'boolean') {
            this.attr[key] = options[key]
          }
      }
    }
  }

  get openingTag (): string {
    let result = ''
    if (this.tagName === 'html') {
      result += '<!doctype html>'
    }
    result += `<${this.tagName}`
    for (const name of Object.keys(this.attr)) {
      result += (this.attr[name] === true)
        ? ` ${name}`
        : ` ${name}="${this.attr[name].toString().replace(/"/g, '\'').replace(/\n/g, '').trim()}"`
    }
    result += '>'
    return result
  }

  get closingTag (): string {
    return `</${this.tagName}>`
  }

  get innerHTML (): string {
    return (this.children.length > 0)
      ? this.children.map(x => x.outerHTML).join('')
      : this.inner
  }

  get outerHTML (): string {
    if (this.innerHTML) {
      return this.openingTag + this.innerHTML + this.closingTag
    }
    if (selfClosingTags.includes(this.tagName)) {
      return this.openingTag
    }
    return this.openingTag + this.closingTag
  }

  public toString (): string {
    return this.outerHTML
  }
}

export type TagName =
  | 'a'
  | 'abbr'
  | 'address'
  | 'area'
  | 'article'
  | 'aside'
  | 'audio'
  | 'b'
  | 'base'
  | 'bdi'
  | 'bdo'
  | 'blockquote'
  | 'body'
  | 'br'
  | 'button'
  | 'canvas'
  | 'caption'
  | 'cite'
  | 'code'
  | 'col'
  | 'colgroup'
  | 'data'
  | 'datalist'
  | 'dd'
  | 'del'
  | 'details'
  | 'dfn'
  | 'dialogue'
  | 'div'
  | 'dl'
  | 'dt'
  | 'em'
  | 'embed'
  | 'fieldset'
  | 'figcaption'
  | 'figure'
  | 'footer'
  | 'form'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'head'
  | 'header'
  | 'hgroup'
  | 'hr'
  | 'html'
  | 'i'
  | 'iframe'
  | 'img'
  | 'input'
  | 'ins'
  | 'kbd'
  | 'label'
  | 'legend'
  | 'li'
  | 'link'
  | 'main'
  | 'map'
  | 'mark'
  | 'menu'
  | 'meta'
  | 'meter'
  | 'nav'
  | 'noscript'
  | 'object'
  | 'ol'
  | 'optgroup'
  | 'option'
  | 'output'
  | 'p'
  | 'param'
  | 'picture'
  | 'pre'
  | 'progress'
  | 'q'
  | 'rb'
  | 'rp'
  | 'rt'
  | 'rtc'
  | 'ruby'
  | 's'
  | 'samp'
  | 'script'
  | 'section'
  | 'select'
  | 'slot'
  | 'small'
  | 'source'
  | 'span'
  | 'strong'
  | 'style'
  | 'sub'
  | 'summary'
  | 'sup'
  | 'table'
  | 'tbody'
  | 'td'
  | 'template'
  | 'textarea'
  | 'tfoot'
  | 'th'
  | 'thead'
  | 'time'
  | 'title'
  | 'tr'
  | 'track'
  | 'u'
  | 'ul'
  | 'var'
  | 'video'
  | 'wbr'

export const selfClosingTags: TagName[] = [
  'br',
  'hr',
  'img',
  'input',
  'link',
  'meta'
]
