import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b7e04e84`;

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('/') ? `${SERVER_URL}${endpoint}` : `${SERVER_URL}/${endpoint}`;
  
  const headers = {
    'Authorization': `Bearer ${publicAnonKey}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  return fetch(url, { ...options, headers });
};
