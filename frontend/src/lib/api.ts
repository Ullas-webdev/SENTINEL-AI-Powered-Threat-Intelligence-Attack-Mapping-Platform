import { Analysis } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8005/api';

export const analyzeText = async (text: string): Promise<Analysis> => {
  const response = await fetch(`${API_BASE_URL}/analyze-threat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input_text: text,
      input_type: 'text',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze threat');
  }

  return response.json();
};

export const uploadFile = async (file: File): Promise<Analysis> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/analyze-threat/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload and analyze file');
  }

  return response.json();
};

export const getHistory = async (): Promise<Analysis[]> => {
  const response = await fetch(`${API_BASE_URL}/analyses`);
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  return response.json();
};

export const getAnalysisById = async (id: string): Promise<Analysis> => {
  const response = await fetch(`${API_BASE_URL}/analyses/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch analysis');
  }
  return response.json();
};
