<script setup lang="ts">
import { ref } from 'vue'
import { DeepseekService } from '@/services/ai/providers/deepseek'
import { getCustomPrompt, translationPrompts } from '@/config/prompts'

const sourceText = ref<string>('')
const targetText = ref<string>('')
const sourceLang = ref<string>('zh')
const targetLang = ref<string>('en')

const deepseekService = new DeepseekService()

const switchLanguages = () => {
  [sourceLang.value, targetLang.value] = [targetLang.value, sourceLang.value] as [string, string]
  [sourceText.value, targetText.value] = [targetText.value, sourceText.value] as [string, string]
}

const translate = async () => {
  if (!sourceText.value) return

  try {
    const prompt = getCustomPrompt('default', sourceLang.value, targetLang.value, sourceText.value)
    const response = await deepseekService.chat(prompt)

    if (response.choices[0].message.content) {
      targetText.value = response.choices[0].message.content
    } else {
      targetText.value = ''
    }
  } catch (error) {
    console.error('Translation failed:', error)
  }
}</script><template>
  <div class="translator-container">
    <div class="language-controls">
      <select v-model="sourceLang">
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
      <button @click="switchLanguages" class="switch-btn">⇄</button>
      <select v-model="targetLang">
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </div>

    <div class="translation-area">
      <textarea
        v-model="sourceText"
        :placeholder="sourceLang === 'zh' ? '请输入中文' : 'Enter English text'"
        rows="5"
      ></textarea>
      <textarea
        v-model="targetText"
        :placeholder="targetLang === 'zh' ? '中文翻译' : 'English translation'"
        rows="5"
        readonly
      ></textarea>
    </div>

    <button @click="translate" class="translate-btn">翻译 / Translate</button>
  </div>
</template>

<style scoped>
.translator-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.language-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.switch-btn {
  padding: 5px 10px;
  cursor: pointer;
}

.translation-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.translate-btn {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.translate-btn:hover {
  background-color: #45a049;
}

select {
  padding: 5px;
  border-radius: 4px;
}
</style>
