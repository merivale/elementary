# Elementary

Elementary is a basic (nowhere near complete) implementation of the HTMLElement Web API for Deno. It is intended for use in Deno web applications, as a templating engine for creating web pages. You can use it to create elements (and whole pages) in a manner similar to how you would in the browser.

## Usage

```ts
import { Element } from 'https://raw.githubusercontent.com/merivale/elementary/v0.4.0/mod.ts'

const div = new Element('div', { children: [
  new Element('h1', { className: 'title', innerHTML: 'Title' }),
  new Element('', { innerHTML: 'Paragraph.' })
] })

div.toString() // '<div><h1 class="title">Title</h1><p>Paragraph.</p></div>'
```
