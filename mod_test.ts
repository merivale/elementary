import { assertEquals } from './test_deps.ts'
import * as mod from './mod.ts'

Deno.test({
  name: 'mod',
  fn() {
    assertEquals(typeof mod.element, 'function')
    assertEquals(typeof mod.Element, 'function')
    assertEquals(typeof mod.selfClosingTags, 'object')
  }
})
