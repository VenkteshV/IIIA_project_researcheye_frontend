import { action } from '../helpers/actionCreator';
import * as actions from '../constants/actions';

export const searchAuthors = (searchValue) => action(actions.SEARCH_CONDITION_TRIGGER, { searchValue });

export const setMode = (mode,range) => action(actions.SET_MODE, {mode,range});
