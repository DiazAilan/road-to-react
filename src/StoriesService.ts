import storiesMockup from './mockups/stories.json';
import { Story } from './models/story';

export function getAsyncStories(): Promise<{data: {stories: Story[]}}> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({data: {stories: storiesMockup}}),
      2000
    )
  })
}

export function getError(): Promise<Error> {
  return new Promise((_, reject) => setTimeout(() => reject('Unknown error'), 2000))
}

