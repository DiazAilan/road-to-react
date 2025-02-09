import { describe, expect, it } from 'vitest';
import storiesMockup from './mockups/stories.json';
import { storiesReducer } from './storiesReducer';

const stories = storiesMockup

type StoriesRemoveAction = {
  type: 'REMOVE_STORY';
  payload: {id: number};
};

describe('storiesReducer', () => {
  it('removes a story from stories', () => {
    const action = { type: 'REMOVE_STORY', payload: { id: 1 } };
    const state = { data: stories, isLoading: false, hasError: false };

    const newState = storiesReducer(state, action as StoriesRemoveAction);

    const expectedState = {
      data: [stories[0], stories[2]],
      isLoading: false,
      hasError: false
    };

    expect(newState).toStrictEqual(expectedState);
  })
});
