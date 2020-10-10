import * as actions from '../constants/actions';

const config = (state = {}, action) => {
  switch (action.type) {
  case actions.CONFIG_LOADED:
    return Object.assign({}, state, {
      config: action.config,
      searchText: action.searchText || '',
      searchResult: action.searchResult || [],
      selectedValues: action.selectedValues || [],
    });
  case actions.SET_VIEW_MODE:
    return Object.assign({}, state, {
      mode:action.mode
    }); 
  default:
    return state;
  }
};

export default config;
