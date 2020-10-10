import { call, put, fork, take,select } from 'redux-saga/effects';
import { callPost, callGet } from '../services/api';
import * as actions from '../constants/actions';
import {config, selectedValues} from './selectors';
import _ from 'lodash';
import { searchResult, removeScore } from '../utils/searchUtil';
import { delay } from 'redux-saga';
import * as query from '../constants/query';

export default function* watchSearchConditionRequest() {
  let searchAction;
  while ((searchAction = yield take(actions.SEARCH_CONDITION_TRIGGER)) !== null) {
    yield fork(searchAuthors, searchAction);
  }
}
export function* searchAuthors(searchAction) {
  try {
    const conditions = yield select(config);
    let result = yield call(searchResult, searchAction.payload.searchValue, conditions.config);
    console.log("result",searchAction.payload.searchValue,result)
    yield put({
      type: actions.CONFIG_LOADED,
      searchResult: result,
      config: conditions.config,
      searchText: searchAction.payload.searchValue,
    });
  }
  catch (error) {
    console.log(error);
  }
}


export  function* watchSetModeRequest() {
  let searchAction;
  while ((searchAction = yield take(actions.SET_MODE)) !== null) {
    yield fork(setMode, searchAction);
  }
}
export function* setMode(searchAction) {
  console.log("searchAction", searchAction.payload.mode.value)
  try {
    const viewMode = searchAction.payload.mode.value
    const range = searchAction.payload.range.value
    if (_.isEqual(viewMode,"PatentsView") ){
      const startIndex = range.split("-")[0];
      const endIndex = range.split("-")[1];
      const graphqlQuery = query.query
      console.log("graphqlQuery",graphqlQuery.split("patent_inventors{"))
      const data = {query: graphqlQuery.split("patent_inventors{")[0]+`patent_inventors(startIndex:${startIndex},endIndex:${endIndex}){`+graphqlQuery.split("patent_inventors{")[1]};
      console.log("data",data)
      const response =   yield call( callPost, '/patents', data);
      console.log('http://localhost:3200/patents',response.response.data.patent_inventors);
      yield put( { type: actions.CONFIG_LOADED, config: response.response.data.patent_inventors } );

    yield put({
      type: actions.SET_VIEW_MODE,
      mode: searchAction.payload.mode.value
    });
  }
  if (_.isEqual(viewMode,"PublicationsView") ){
    const startIndex = range.split("-")[0];
    const endIndex = range.split("-")[1];
    const graphqlQuery = query.researcher
    const data = {query: graphqlQuery.split("researcher{")[0]+`researcher(startIndex:${startIndex},endIndex:${endIndex}){`+graphqlQuery.split("researcher{")[1]};
    console.log("data",data)
    const response =   yield call( callPost, '/researcher', data);
    console.log('http://localhost:3200/researcher',response.response.data.researcher);
    yield put( { type: actions.CONFIG_LOADED, config: response.response.data.researcher } );

  yield put({
    type: actions.SET_VIEW_MODE,
    mode: searchAction.payload.mode.value
  });
}
  }
  catch (error) {
    console.log(error);
  }
}
