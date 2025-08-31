import { WebhookPayload, WebhookResponse } from '../types';

const WEBHOOK_URL = 'https://personal-n8n.brtnrr.easypanel.host/webhook/LeadMagnet';

export class WebhookService {
  private static instance: WebhookService;
  
  static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }

  async sendStep(payload: WebhookPayload): Promise<WebhookResponse> {

    try {
      console.log('Sending to webhook:', payload);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WebhookResponse = await response.json();
      console.log('Webhook response:', data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }
      
      throw new Error('Error desconocido en la conexión');
    }
  }

  async sendWithRetry(payload: WebhookPayload, retries = 1): Promise<WebhookResponse> {
    try {
      return await this.sendStep(payload);
    } catch (error) {
      if (retries > 0) {
        // Wait 1 second before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.sendWithRetry(payload, retries - 1);
      }
      throw error;
    }
  }
}