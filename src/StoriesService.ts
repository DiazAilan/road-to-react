import storiesMockup from './mockups/stories.json';
import { Story } from './models/story';

export function getAsyncStories(): Promise<{data: {stories: Story[]}}> {
  // return Promise.resolve({data: {stories: storiesMockup}})
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({data: {stories: storiesMockup}}),
      2000
    )
  })
}