export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface WebsiteGenerationRequest {
  prompt: string;
}

export interface LMStudioResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}
