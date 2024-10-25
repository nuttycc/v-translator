export type PromptType = 'default' | 'formal' | 'casual'

// 定义模板变量
const TEMPLATE_VARS = {
  SOURCE_LANG: '{sourceLang}',
  TARGET_LANG: '{targetLang}',
  TEXT: '{text}'
} as const

// 语言映射函数
const getLangText = (lang: string) => lang === 'zh' ? '中文' : '英文'

export const translationPrompts = {
  default: () =>
    `将以下${TEMPLATE_VARS.SOURCE_LANG}文本翻译成${TEMPLATE_VARS.TARGET_LANG}: ${TEMPLATE_VARS.TEXT}`,

  formal: () =>
    `将以下${TEMPLATE_VARS.SOURCE_LANG}文本翻译成${TEMPLATE_VARS.TARGET_LANG}: ${TEMPLATE_VARS.TEXT}`,

  casual: () =>
    `将以下${TEMPLATE_VARS.SOURCE_LANG}文本翻译成${TEMPLATE_VARS.TARGET_LANG}: ${TEMPLATE_VARS.TEXT}`
}
export const getCustomPrompt = (key: PromptType, sourceLang: string, targetLang: string, text: string) => {
  const replaceVars = (template: string) => {
    return template
      .replace(TEMPLATE_VARS.SOURCE_LANG, getLangText(sourceLang))
      .replace(TEMPLATE_VARS.TARGET_LANG, getLangText(targetLang))
      .replace(TEMPLATE_VARS.TEXT, text)
  }

  const savedPrompt = localStorage.getItem(`prompt_${key}`)
  if (savedPrompt) {
    return replaceVars(savedPrompt)
  }
  return replaceVars(translationPrompts[key](sourceLang, targetLang, text))
}
