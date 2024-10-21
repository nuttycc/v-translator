import axios from 'axios';

class TranslationService {
  private static instance: TranslationService;
  private tokens: { [key: string]: string } = {};

  private constructor() {}

  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  public setToken(service: string, token: string): void {
    this.tokens[service] = token;
    localStorage.setItem(service, token);
  }

  public getToken(service: string): string | null {
    if (this.tokens[service]) {
      return this.tokens[service];
    }
    const token = localStorage.getItem(service);
    if (token) {
      this.tokens[service] = token;
    }
    return token;
  }

  public async translate(service: string, text: string): Promise<string> {
    const token = this.getToken(service);
    if (!token) {
      throw new Error(`Token for ${service} is not set.`);
    }

    switch (service) {
      case 'service1':
        return this.translateWithService1(token, text);
      case 'service2':
        return this.translateWithService2(token, text);
      default:
        throw new Error(`Unknown service: ${service}`);
    }
  }

  private async translateWithService1(token: string, text: string): Promise<string> {
    const response = await axios.post('https://api.service1.com/translate', {
      token,
      text,
    });
    return response.data.translation;
  }

  private async translateWithService2(token: string, text: string): Promise<string> {
    const response = await axios.post('https://api.service2.com/translate', {
      token,
      text,
    });
    return response.data.translation;
  }
}

export default TranslationService.getInstance();
