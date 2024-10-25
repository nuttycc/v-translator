import OpenAI from "openai";

export interface AIServiceConfig {
  apiKey: string;
  baseURL?: string;
  modelName: string;
}

export interface AIProvider {
  id: string;
  name: string;
  defaultModel: string;
  defaultBaseURL?: string;
}

export abstract class BaseAIService {
  protected client: OpenAI;
  protected config: AIServiceConfig;
  protected provider: AIProvider;

  constructor(provider: AIProvider) {
    this.provider = provider;
    this.config = this.getConfig();
    this.client = this.createClient();
  }

  protected getConfig(): AIServiceConfig {
    return {
      apiKey: localStorage.getItem(`${this.provider.id}_api_key`) || '',
      baseURL: localStorage.getItem(`${this.provider.id}_base_url`) || this.provider.defaultBaseURL,
      modelName: localStorage.getItem(`${this.provider.id}_model`) || this.provider.defaultModel
    };
  }

  protected createClient(): OpenAI {
    if (!this.config.apiKey) {
      console.error(`${this.provider.name} API key is not set`);
    }

    return new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
      dangerouslyAllowBrowser: true,
    })
  }

  async chat(content: string) {
    const startTime = Date.now();
    const chatCompletion = await this.client.chat.completions.create({
      model: this.config.modelName,
      messages: [{ role: "user", content }],
    });
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log('AI Response Debug Info:', {
      provider: this.provider.name,
      model: this.config.modelName,
      duration: `${duration}ms`,
      responseLength: chatCompletion.choices[0]?.message?.content?.length || 0,
      promptTokens: chatCompletion.usage?.prompt_tokens,
      completionTokens: chatCompletion.usage?.completion_tokens,
      totalTokens: chatCompletion.usage?.total_tokens,
    });

    return chatCompletion;
  }

  updateConfig(newConfig: Partial<AIServiceConfig>) {
    const updatedConfig = { ...this.config, ...newConfig };

    if (newConfig.apiKey) {
      localStorage.setItem(`${this.provider.id}_api_key`, newConfig.apiKey);
    }
    if (newConfig.baseURL) {
      localStorage.setItem(`${this.provider.id}_base_url`, newConfig.baseURL);
    }
    if (newConfig.modelName) {
      localStorage.setItem(`${this.provider.id}_model`, newConfig.modelName);
    }

    this.config = updatedConfig;
    this.client = this.createClient();
  }
}
