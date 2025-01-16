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
    stories.map((story) => <InlineHandlersItem story={story} onClick={handleDeleteStory}/>)
  )
}

interface InlineHandlersItemProps {
  story: Story;
  onClick: (storyId: number) => void;
} 

const InlineHandlersItem = ({story, onClick}: InlineHandlersItemProps) => {

  function handleOnClick(story: Story): void {
    onClick(story.id)
  }
  
  return (
    <div>
      <label>{story.title} | {story.author}</label>
      <Button onClick={() => handleOnClick(story)}>Delete</Button>
    </div>
  )
}