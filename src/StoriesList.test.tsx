import { describe, expect, it } from "vitest";
import storiesMockup from './mockups/stories.json';
import { StoryItem } from "./StoriesList";
import { render, screen } from "@testing-library/react";

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

  });
  
});
