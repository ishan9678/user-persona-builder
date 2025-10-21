'use client';

import { useState } from 'react';
import { X, Loader2, Trash2, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { chatWithPersona } from '../llm/chat';
import type { UserPersona, ProductProfile } from '../llm/types';

type PersonaChatModalProps = {
  persona: UserPersona;
  productProfile?: ProductProfile;
  isOpen: boolean;
  onClose: () => void;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  onMessagesChange: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => void;
};


export function PersonaChatModal({ persona, productProfile, isOpen, onClose, messages, onMessagesChange }: PersonaChatModalProps) {

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear this chat history?')) {
      const initialMessages = [{
        role: 'assistant' as const,
        content: `Hi! I'm ${persona.name}, ${persona.demographic}. I'm here to help you understand my perspective as a user persona. Feel free to ask me anything about my needs, goals, or how I'd use your product!`
      }];
      onMessagesChange(initialMessages);
    }
  };

  const handleExportChat = () => {
    // Create markdown content from chat messages
    const markdown = `# Chat with ${persona.name}

**Persona:** ${persona.name}  
**Demographic:** ${persona.demographic}  
**Date:** ${new Date().toLocaleDateString()}

---

${messages.map((msg, idx) => {
  const role = msg.role === 'user' ? '**You**' : `**${persona.name}**`;
  return `### ${role}\n\n${msg.content}\n`;
}).join('\n')}`;

    // Download as markdown file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${persona.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    // Add user message immediately
    onMessagesChange([...messages, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Get response from Gemini via server action
      const result = await chatWithPersona(persona, productProfile, userMessage, messages);
      
      if (result.success) {
        onMessagesChange([...messages, 
          { role: 'user', content: userMessage },
          { role: 'assistant', content: result.message }
        ]);
      } else {
        onMessagesChange([...messages,
          { role: 'user', content: userMessage },
          { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      onMessagesChange([...messages,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl h-[600px] bg-background border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-black dark:border-white flex items-center justify-between bg-primary text-primary-foreground">
          <div>
            <h3 className="text-xl font-black uppercase">{persona.name}</h3>
            <p className="text-sm opacity-90">{persona.demographic}</p>
          </div>
          <div className="flex gap-2">
            {messages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleExportChat}
                  className="hover:bg-primary-foreground/20"
                  title="Export chat to markdown"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearChat}
                  className="hover:bg-primary-foreground/20"
                  title="Clear chat history"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t-2 border-black dark:border-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder={`Ask ${persona.name} anything...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border-2 border-black dark:border-white bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading}
              className="border-2 border-black dark:border-white font-bold uppercase"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                </>
              ) : (
                'Send'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
