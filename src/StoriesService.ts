import { Story } from './models/story';
import axios from 'axios';

export async function getAsyncStories(query: string): Promise<Story[]> {
  const API_ENDPOINT = `https://hn.algolia.com/api/v1/search?query=${query || 'React'}`
  const response = await axios(API_ENDPOINT)
  return response.data.hits
}

export function getError(): Promise<Error> {
  return new Promise((_, reject) => setTimeout(() => reject('Unknown error'), 2000))
}

