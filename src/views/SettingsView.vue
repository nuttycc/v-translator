<template>
  <div class="settings-container">
    <h2>设置</h2>

    <!-- OpenAI 设置 -->
    <div class="form-group">
      <label for="openaiKey">OpenAI API Key</label>
      <input
        type="password"
        id="openaiKey"
        v-model="apiKeys.openai"
        placeholder="请输入您的 OpenAI API Key"
        @change="saveApiKey('openai')"
      />
    </div>

    <!-- Deepseek 设置 -->
    <div class="form-group">
      <label for="deepseekKey">Deepseek API Key</label>
      <input
        type="password"
        id="deepseekKey"
        v-model="apiKeys.deepseek"
        placeholder="请输入您的 Deepseek API Key"
        @change="saveApiKey('deepseek')"
      />
    </div>

    <!-- 01.AI 设置 -->
    <div class="form-group">
      <label for="zeroOneKey">01.AI API Key</label>
      <input
        type="password"
        id="zeroOneKey"
        v-model="apiKeys.zeroOne"
        placeholder="请输入您的 01.AI API Key"
        @change="saveApiKey('zeroOne')"
      />
    </div>

    <p class="hint">所有 API Key 将安全地存储在您的本地环境中</p>
      <!-- 添加 Prompt 设置区域 -->
      <div class="prompt-settings">
        <h3>翻译提示词设置</h3>
        <div class="variables-hint">
          <p>可用变量:</p>
          <ul>
            <li><code>{sourceLang}</code> - 源语言</li>
            <li><code>{targetLang}</code> - 目标语言</li>
            <li><code>{text}</code> - 待翻译文本</li>
          </ul>
        </div>

        <div class="form-group" v-for="(prompt, key) in prompts" :key="key">
          <label :for="key">{{ getPromptLabel(key) }}</label>
          <textarea
            :id="key"
            v-model="prompts[key]"
            rows="3"
            @change="savePrompt(key)"
          ></textarea>
        </div>

        <button class="reset-button" @click="resetPrompts">重置为默认提示词</button>
      </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { translationPrompts, type PromptType } from '@/config/prompts'

interface ApiKeys {
  openai: string
  deepseek: string
  zeroOne: string
}

const apiKeys = ref<ApiKeys>({
  openai: '',
  deepseek: '',
  zeroOne: ''
})

const saveApiKey = (provider: keyof ApiKeys) => {
  localStorage.setItem(`${provider}_api_key`, apiKeys.value[provider])
}



// 修改 prompts 的类型定义
const prompts = ref<Record<PromptType, string>>({
  default: '',
  formal: '',
  casual: ''
})



const getPromptLabel = (key: PromptType) => {
  const labels: Record<PromptType, string> = {
    default: '默认翻译提示词',
    formal: '正式翻译提示词',
    casual: '口语翻译提示词'
  }

  return labels[key]
}


const savePrompt = (key: PromptType) => {
  localStorage.setItem(`prompt_${key}`, prompts.value[key])

}
const resetPrompts = () => {
  (Object.keys(prompts.value) as Array<keyof typeof prompts.value>).forEach(key => {
    prompts.value[key] = translationPrompts[key]()
    savePrompt(key)
  })
}

onMounted(() => {
  // 加载所有保存的 API Keys
  const providers: (keyof ApiKeys)[] = ['openai', 'deepseek', 'zeroOne'];

  providers.forEach(provider => {
    const savedKey = localStorage.getItem(`${provider}_api_key`);
    if (savedKey) {
      apiKeys.value[provider] = savedKey;
    }
  });

  // 加载保存的提示词
  (Object.keys(prompts.value) as Array<keyof typeof prompts.value>).forEach(key => {
    const savedPrompt = localStorage.getItem(`prompt_${key}`);
    if (savedPrompt) {
      prompts.value[key] = savedPrompt;
    } else {
      prompts.value[key] = translationPrompts[key]();
    }
  });
});
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin: 20px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:focus {
  outline: none;
  border-color: #4a9eff;
  box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
}

.hint {
  font-size: 0.8em;
  color: #666;
  margin-top: 16px;
  text-align: center;
}

.prompt-settings {
  margin-top: 40px;
}

textarea {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #4a9eff;
  box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
}

.reset-button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #4a9eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #3a8eef;
}
</style>


