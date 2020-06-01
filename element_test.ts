import { assertEquals } from './test_deps.ts'
import { element, Element } from './element.ts'

Deno.test({
  name: 'element',
  fn () {
    const tagName = 'div'
    const options = { id: 'test', innerHTML: 'test' }
    assertEquals(new Element(tagName, options), element(tagName, options))
  }
})

Deno.test({
  name: 'Element constructor',
  fn () {
    const tagName = 'div'
    const children = [
      element('p', { innerHTML: 'first paragraph' }),
      element('p', { innerHTML: 'second paragraph' })
    ]
    const className = 'foo bar baz'
    const style = { background: 'red', color: 'white' }
    const id = 'test'
    const el = new Element('div', { children, className, style, id })
    assertEquals(el.tagName, tagName)
    assertEquals(el.className, className)
    for (const [key, value] of Object.entries(style)) {
      assertEquals(el.style.getPropertyValue(key), value)
    }
    assertEquals(el.id, id)
  }
})

Deno.test({
  name: 'Element innerHTML',
  fn () {
    const el = new Element('div', { children: [
      new Element('p', { children: [
        'This has some ',
        new Element('em', { innerHTML: 'emphasized' }),
        ' text.'
      ] }),
      new Element('div', { innerHTML: 'This is just some text.' })
    ] })
    const innerHTML = '<p>This has some <em>emphasized</em> text.</p><div>This is just some text.</div>'
    assertEquals(el.innerHTML, innerHTML)
  }
})

Deno.test({
  name: 'Element outerHTML',
  fn () {
    const innerHTML = 'some stuff here'
    const className = 'one two three'
    const style = { background: 'red', color: 'white' }
    const id = 'test'
    const foo = 'bar'
    const el = new Element('div', { innerHTML, className, style, id, foo })
    const html = '<div class="one two three" style="background: red; color: white;" id="test" foo="bar">some stuff here</div>'
  }
})

Deno.test({
  name: 'Element toString',
  fn () {
    const html = new Element('html', { innerHTML: 'stuff' })
    const p = new Element('p', { innerHTML: 'stuff' })
    assertEquals(html.toString(), '<!doctype html>' + html.outerHTML)
    assertEquals(p.toString(), p.outerHTML)
  }
})
