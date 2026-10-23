import en from './en.json'
import vi from './vi.json'

export type Lang = 'vi' | 'en'
export const DEFAULT_LANG: Lang = 'vi'

export type Dictionary = Record<string, string>
export type Dictionaries = Record<Lang, Dictionary>
export type Params = Record<string, string | number>

export const dictionaries: Dictionaries = { vi, en }

// Replaces {name} with params.name. Unknown placeholders are left as-is.
function interpolate(text: string, params?: Params): string {
  if (!params) return text
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  )
}

// Pure lookup: chosen language -> default language -> the key itself.
export function translate(
  dicts: Dictionaries,
  key: string,
  params?: Params,
  lang: Lang = DEFAULT_LANG,
): string {
  const text = dicts[lang][key] ?? dicts[DEFAULT_LANG][key] ?? key
  return interpolate(text, params)
}

export function t(key: string, params?: Params, lang: Lang = DEFAULT_LANG): string {
  return translate(dictionaries, key, params, lang)
}
