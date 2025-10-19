import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { getEnv } from '@/lib/env';

let modelInstance: ChatGoogleGenerativeAI | null = null;

export function getGeminiModel() {
  if (!modelInstance) {
    const env = getEnv();
    
    modelInstance = new ChatGoogleGenerativeAI({
      apiKey: env.GEMINI_API_KEY,
      model: 'gemini-1.5-flash',
      temperature: 0.7,
      maxOutputTokens: 2048,
    });
  }
  
  return modelInstance;
}

export function formatJsonResponse(text: string): any {
  try {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // Try to extract JSON from the response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      return JSON.parse(text.slice(jsonStart, jsonEnd));
    }
    
    // Try to parse the entire text
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${error}`);
  }
}
