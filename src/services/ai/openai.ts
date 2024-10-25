import OpenAI from "openai";

interface AIConfig {
  apiKey: string;
  baseURL?: string;
  modelName: string;
}

const DEFAULT_MODEL = "gpt-3.5-turbo";

const getConfig = (): AIConfig => {
  return {
    apiKey: localStorage.getItem('ai_api_key') || '',
    baseURL: localStorage.getItem('ai_base_url') || undefined,
    modelName: localStorage.getItem('ai_model_name') || DEFAULT_MODEL
  };
}

const createAIClient = (config: AIConfig) => {
  if (!config.apiKey) {
    throw new Error('API key is not set');
  }

  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
  });
}

export class AIService {
  private client: OpenAI;
  private config: AIConfig;

  constructor() {
    this.config = getConfig();
    this.client = createAIClient(this.config);
  }

  async chat(content: string) {
    const chatCompletion = await this.client.chat.completions.create({
      model: this.config.modelName,
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });
    return chatCompletion;
  }

  updateConfig(newConfig: Partial<AIConfig>) {
    const updatedConfig = {
      ...this.config,
      ...newConfig
    };

    // 更新本地存储
    if (newConfig.apiKey) {
      localStorage.setItem('ai_api_key', newConfig.apiKey);
    }
    if (newConfig.baseURL) {
      localStorage.setItem('ai_base_url', newConfig.baseURL);
    }
    if (newConfig.modelName) {
      localStorage.setItem('ai_model_name', newConfig.modelName);
    }

    this.config = updatedConfig;
    this.client = createAIClient(this.config);
  }
}
