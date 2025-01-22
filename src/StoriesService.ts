import { Story } from './models/story';

export async function getAsyncStories(query: string): Promise<Story[]> {
  const API_ENDPOINT = `https://hn.algolia.com/api/v1/search?query=${query || 'React'}`
  const response = await fetch(API_ENDPOINT)
  const data = await response.json();
  return data.hits
}

export function getError(): Promise<Error> {
  return new Promise((_, reject) => setTimeout(() => reject('Unknown error'), 2000))
}

