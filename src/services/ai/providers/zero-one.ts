import { BaseAIService, type AIProvider } from '../base';

const ZERO_ONE_PROVIDER: AIProvider = {
  id: 'zero-one',
  name: '01.AI',
  defaultModel: 'yi-34b-chat',
  defaultBaseURL: 'https://api.01.ai/v1'  // 示例URL
};

export class ZeroOneService extends BaseAIService {
  constructor() {
    super(ZERO_ONE_PROVIDER);
  }
}
