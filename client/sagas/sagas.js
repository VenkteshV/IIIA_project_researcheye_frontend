import { all } from 'redux-saga/effects';
import watchStartApplication from './startApplication';
import watchSearchConditionRequest from './search';
import { watchSetModeRequest } from'./search';
export default function* rootSaga() {
  yield all([
    watchStartApplication(),
    watchSearchConditionRequest(),
    watchSetModeRequest(),
  ]);
}
