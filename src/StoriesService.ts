import { Story } from './models/story';

export async function getAsyncStories(): Promise<{data: {stories: Story[]}}> {
    const response = await fetch('https://hn.algolia.com/api/v1/search?tags=story')
    const data = await response.json();
    return {data: {stories: data.hits}}
}

export function getError(): Promise<Error> {
  return new Promise((_, reject) => setTimeout(() => reject('Unknown error'), 2000))
}

