import { all, fork } from "redux-saga/effects";
//call은 동기로 호출, fork는 비동기 호출

import postSaga from './post'
import userSaga from './user'

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ])
}