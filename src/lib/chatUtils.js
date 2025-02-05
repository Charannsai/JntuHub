import { supabase } from './supabase';
import { getChatResponse } from './gemini.js';

export async function getRelevantContext(message) {
  try {
    // First try to get context from Supabase
    const { data, error } = await supabase
      .from('jntuh_data')
      .select('content')
      .textSearch('content', message.split(' ').join(' & '));

    if (error) {
      console.warn('Supabase search error:', error);
      return ''; // Return empty context if there's an error
    }

    return data?.map(item => item.content).join('\n\n') || '';
  } catch (error) {
    console.warn('Error getting context:', error);
    return ''; // Return empty context on error
  }
}

export async function processUserMessage(userId, message) {
  try {
    // Get relevant context from database
    let context = '';
    try {
      context = await getRelevantContext(message);
    } catch (error) {
      console.warn('Failed to get context, proceeding without it:', error);
    }
    
    // Get AI response
    const response = await getChatResponse(message, context);
    
    return response;
  } catch (error) {
    console.error('Error processing message:', error);
    return "I'm having trouble processing your request. Please try again later.";
  }
}