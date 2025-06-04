"use client";

// This file will contain functions for interacting with Gemini API
// Note: This is a placeholder for now as we'll need to integrate with actual Gemini API
// For MVP, we can use a simple implementation that returns predefined responses

import { MessageCategory } from '../types';

// System prompt for generating empathetic responses
const SYSTEM_PROMPT = `
You are an empathetic AI assistant for the "nevsluh" platform.
Your role is to provide short, supportive, and thoughtful responses to anonymous messages.

Guidelines:
- Keep responses under 300 characters
- Be warm and empathetic, but not overly emotional
- Don't give advice or try to solve problems
- Acknowledge feelings without judgment
- Never use clichés or generic platitudes
- Speak as if you're responding to a friend in need
- Don't reference yourself as an AI

The message category is: {category}
`;

// Mock function for generating AI replies (fallback if API call fails)
export const generateAIReply = async (message: string, category: MessageCategory): Promise<string> => {
  // In production, this would call the Gemini API
  // For now, we'll return predefined responses based on the category
  
  const responses = {
    [MessageCategory.DREAM]: [
      "Dreams have their own timeline. Yours matters, whether it happens tomorrow or years from now.",
      "The fact that you still hold this dream says something beautiful about you.",
      "Some dreams wait patiently for the right moment. Yours is still alive for a reason.",
    ],
    [MessageCategory.PAIN]: [
      "That kind of pain changes something in us. Thank you for sharing what's hard to say.",
      "You've carried this silently for so long. I hear you now.",
      "The weight of that must be enormous. Your strength in carrying it doesn't go unseen.",
    ],
    [MessageCategory.HOPE]: [
      "Hope is quiet rebellion against what seems inevitable. Hold onto yours.",
      "Even small hopes can light impossible paths. Yours matters.",
      "That hope you're protecting? It's worth guarding closely.",
    ],
    [MessageCategory.QUESTION]: [
      "Some questions stay with us because they touch what matters most. Yours deserves space.",
      "The questions we carry often reveal more than any answer could.",
      "That's the kind of question that shapes a life. Thank you for sharing it.",
    ],
    [MessageCategory.CONFESSION]: [
      "Bringing this into words takes courage. You've already taken the hardest step.",
      "What we confess in silence often loses some of its weight when finally spoken.",
      "This truth is part of your story, but it doesn't define all of who you are.",
    ],
    [MessageCategory.STORY]: [
      "Stories like yours remind us how complex being human really is. Thank you for sharing.",
      "This moment you've shared - it matters. It's part of the human experience.",
      "Your story creates space for others to feel less alone with theirs.",
    ],
  };
  
  // Select a random response from the appropriate category
  const categoryResponses = responses[category] || responses[MessageCategory.CONFESSION];
  const randomIndex = Math.floor(Math.random() * categoryResponses.length);
  
  return categoryResponses[randomIndex];
};

// Real implementation using Gemini API
export const callGeminiAPI = async (message: string, category: MessageCategory): Promise<string> => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return generateAIReply(message, category);
    }
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('Gemini API key not found, using fallback responses');
      return generateAIReply(message, category);
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: SYSTEM_PROMPT.replace('{category}', category) + '\n\nUser message: ' + message
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      })
    });
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.warn('Unexpected Gemini API response format, using fallback', data);
      return generateAIReply(message, category);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return generateAIReply(message, category);
  }
}; 