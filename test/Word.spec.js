import { mount } from '@vue/test-utils'
import Word from '@/components/Word.vue'

describe('Word', () => {
  test('is a word', () => {
    const wrapper = mount(Word)
    expect(wrapper.vm).toBeTruthy()
  })
})
