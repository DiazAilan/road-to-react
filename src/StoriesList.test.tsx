import { describe, expect, it, vi } from "vitest";
import storiesMockup from './mockups/stories.json';
import { StoryItem } from "./StoriesList";
import { fireEvent, render, screen } from "@testing-library/react";

const stories = storiesMockup;

describe('StoriesList', () => {

  describe('StoryItem', () => {
    it('renders all properties', () => {
      render(<StoryItem story={stories[0]} onDelete={() => {}}/>);

      expect(screen.getByText('React - Jordan Walke')).toBeInTheDocument();
      expect(screen.getByText('React - Jordan Walke')).toHaveAttribute(
        'href',
        'https://reactjs.org/'
      );
    });

    it('renders a clickable delete button', () => {
      render(<StoryItem story={stories[0]} onDelete={() => {}}/>);

      const deleteButton = screen.getByRole('button');
      expect(deleteButton).toBeInTheDocument();
    });

    it('clicking the delete button calls the callback handler', () => {
      const handleDelete = vi.fn();
      render(<StoryItem story={stories[0]} onDelete={handleDelete}/>);

      const deleteButton = screen.getByRole('button');
      fireEvent.click(deleteButton);
      expect(handleDelete).toHaveBeenCalledWith(stories[0].objectID);
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });

  });
  
});
