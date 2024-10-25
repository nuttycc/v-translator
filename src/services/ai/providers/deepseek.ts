import { BaseAIService, type AIProvider } from '../base';

const DEEPSEEK_PROVIDER: AIProvider = {
  id: 'deepseek',
  name: 'Deepseek',
  defaultModel: 'deepseek-chat',
  defaultBaseURL: 'https://api.deepseek.com/v1'  // 示例URL
};

export class DeepseekService extends BaseAIService {
  constructor() {
    super(DEEPSEEK_PROVIDER);
  }
}
