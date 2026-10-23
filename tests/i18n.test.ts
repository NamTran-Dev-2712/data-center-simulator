import { describe, expect, it } from 'vitest'
import en from '../src/i18n/en.json'
import vi from '../src/i18n/vi.json'
import { DEFAULT_LANG, t, translate, type Dictionaries } from '../src/i18n/index.ts'

describe('i18n', () => {
  it('vi and en have the same keys', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(vi).sort())
  })

  it('returns the right text for each language', () => {
    expect(DEFAULT_LANG).toBe('vi')
    expect(t('ui.language.en')).toBe('Tiếng Anh')
    expect(t('ui.language.en', undefined, 'vi')).toBe('Tiếng Anh')
    expect(t('ui.language.en', undefined, 'en')).toBe('English')
  })

  it('falls back to vi when a key is missing in en', () => {
    const dicts: Dictionaries = { vi: { 'only.vi': 'Chỉ có tiếng Việt' }, en: {} }
    expect(translate(dicts, 'only.vi', undefined, 'en')).toBe('Chỉ có tiếng Việt')
  })

  it('returns the key itself when it does not exist anywhere', () => {
    expect(t('does.not.exist', undefined, 'en')).toBe('does.not.exist')
  })

  it('replaces {param} placeholders', () => {
    expect(t('ui.greeting', { name: 'Nam' })).toBe('Xin chào, Nam!')
    expect(t('ui.greeting', { name: 'Nam' }, 'en')).toBe('Hello, Nam!')
    expect(t('ui.greeting')).toBe('Xin chào, {name}!')
  })
})
