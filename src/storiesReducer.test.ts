import { describe, expect, it } from 'vitest';
import storiesMockup from './mockups/stories.json';
import { storiesReducer } from './storiesReducer';

const stories = storiesMockup

type StoriesFetchSuccessAction = {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Story[];
};

type StoriesRemoveAction = {
  type: 'REMOVE_STORY';
  payload: {id: number};
};

type StoriesFetchInitAction = {
  type: 'STORIES_FETCH_INIT'
}

type StoriesFetchFailureAction = {
  type: 'STORIES_FETCH_FAILURE'
}

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

  it('init stories fetching', () => {
    const action = { type: 'STORIES_FETCH_INIT'};
    const state = { data: [], isLoading: false, hasError: false };

    const newState = storiesReducer(state, action as StoriesFetchInitAction);

    const expectedState = {
      data: [],
      isLoading: true,
      hasError: false
    };

    expect(newState).toStrictEqual(expectedState);
  })

  it('fetch stories successfully', () => {
    const action = { type: 'STORIES_FETCH_SUCCESS', payload: stories };
    const state = { data: [], isLoading: true, hasError: false };

    const newState = storiesReducer(state, action as StoriesFetchSuccessAction);

    const expectedState = {
      data: stories,
      isLoading: false,
      hasError: false
    };

    expect(newState).toStrictEqual(expectedState);
  })

  it('fails to fetch stories', () => {
    const action = { type: 'STORIES_FETCH_FAILURE' };
    const state = { data: [], isLoading: true, hasError: false };

    const newState = storiesReducer(state, action as StoriesFetchFailureAction);

    const expectedState = {
      data: [],
      isLoading: false,
      hasError: true
    };

    expect(newState).toStrictEqual(expectedState);
  })

});
