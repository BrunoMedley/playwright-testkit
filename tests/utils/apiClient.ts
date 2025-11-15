import { APIRequestContext, APIResponse } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'dev';
const envFile = path.resolve(__dirname, `../../env/.env.${env}`);
dotenv.config({ path: envFile });

export class ApiClient {
  private request: APIRequestContext;
  private baseURL: string;
  private apiKey: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = process.env.API_BASE_URL || 'https://api.example.com';
    this.apiKey = process.env.API_KEY || '';
  }

  /**
   * Make a GET request
   */
  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  /**
   * Make a POST request
   */
  async post(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}${endpoint}`, {
      data,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  /**
   * Make a PUT request
   */
  async put(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}${endpoint}`, {
      data,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  /**
   * Make a PATCH request
   */
  async patch(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.patch(`${this.baseURL}${endpoint}`, {
      data,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  /**
   * Make a DELETE request
   */
  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  /**
   * Set custom API key
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * Set custom base URL
   */
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
  }
}

