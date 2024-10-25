import { BaseAIService, type AIProvider } from '../base';

const OPENAI_PROVIDER: AIProvider = {
  id: 'openai',
  name: 'OpenAI',
  defaultModel: 'gpt-3.5-turbo'
};

export class OpenAIService extends BaseAIService {
  constructor() {
    super(OPENAI_PROVIDER);
  }
}
