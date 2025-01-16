import { Button } from './Button';
import storiesMockup from './mockups/stories.json';
import { useState } from "react";
import { Story } from './models/story';

export const InlineHandlersList = () => {

  const [stories, setStories] = useState(storiesMockup)

  function handleDeleteStory(id: number): void {
    setStories(stories.filter(story => story.id !== id))
  }

  return (
    stories.map((story) => <InlineHandlersItem story={story} onDelete={handleDeleteStory}/>)
  )
}

interface InlineHandlersItemProps {
  story: Story;
  onDelete: (storyId: number) => void;
} 

const InlineHandlersItem = ({story, onDelete}: InlineHandlersItemProps) => {
  
  return (
    <div>
      <label>{story.title} | {story.author}</label>
      <Button onClick={() => onDelete(story.id)}>Delete</Button>
    </div>
  )
}