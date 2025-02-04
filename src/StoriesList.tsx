import { memo } from 'react';
import { Button } from './Button';
import { Story } from './models/story';

export interface StoriesListProps {
  stories: Story[]
  onDeleteStory: (id: number) => void
}

export const StoriesList = memo(({stories, onDeleteStory}: StoriesListProps) => (
  <ul>
    {stories.map((story) => <StoryItem story={story} onDelete={onDeleteStory} key={story.objectID}/>)}
  </ul> 
))

interface StoryItemProps {
  story: Story;
  onDelete: (storyId: number) => void;
} 

const StoryItem = ({story, onDelete}: StoryItemProps) => (
  <li>
    <span>
      <a href={story.url}>{story.title} - {story.author}</a>
    </span>
    <span> | {story.numComments} comments</span>
    <span> | {story.points} points</span>
    <Button onClick={() => onDelete(story.objectID)}>Delete</Button>
  </li>
)