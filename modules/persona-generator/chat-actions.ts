'use server';

import { getGeminiModel } from './model';
import { getPersonaChatContext } from './prompts';
import type { UserPersona } from './types';

export async function chatWithPersona(
  persona: UserPersona,
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
) {
  try {
    const model = getGeminiModel();

    // Build context about the persona using centralized prompt
    const personaContext = getPersonaChatContext(persona);

    // Build conversation messages
    const messages = [
      { role: 'system' as const, content: personaContext },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.content
      })),
      { role: 'user' as const, content: userMessage }
    ];

    // Get response from Gemini
    const response = await model.invoke(messages);
    
    return {
      success: true,
      message: typeof response.content === 'string' 
        ? response.content 
        : response.content.toString()
    };
  } catch (error) {
    console.error('Error chatting with persona:', error);
    return {
      success: false,
      message: 'Sorry, I encountered an error. Please try again.'
    };
  }
}
