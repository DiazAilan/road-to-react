import { Story } from "./models/story";

type StoriesState = {
  data: Story[];
  isLoading: boolean;
  hasError: boolean;
}

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

type StoriesAction =
    StoriesFetchSuccessAction
  | StoriesRemoveAction
  | StoriesFetchInitAction
  | StoriesFetchFailureAction

export const storiesReducer = (state: StoriesState, action: StoriesAction) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        hasError: false, 
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        hasError: false, 
        data: action.payload
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        hasError: true, 
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter((story: Story) => action.payload.id !== story.objectID)
      }
    default:
      throw new Error();
  }
};