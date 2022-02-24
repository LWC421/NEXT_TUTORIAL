import { all, fork, call, put, take, takeEvery, takeLatest, throttle, delay } from "redux-saga/effects";
//call은 동기로 호출, fork는 비동기 호출
import axios from 'axios'

function logInAPI(data) {
  return axios.post('/api/login', data)
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data)
    yield delay(1000)
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data
    })
  }
  catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data
    })
  }
}

function logOutAPI() {
  return axios.post('/api/logout')
}

function* logOut() {
  try {
    const result = yield call(logOutAPI)
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data
    })
  }
  catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    })
  }
}

function addPostAPI() {
  return axios.post('/api/post')
}

function* addPost() {
  try {
    const result = yield call(addPostAPI)
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data
    })
  }
  catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    })
  }
}


function* watchLogIn() {
  yield throttle('LOG_IN_REQUEST', logIn, 2000)  //take는 해당 액션이 실행 될때까지 기다림
}

function* watchLogOut() {
  yield throttle('LOG_OUT_REQUEST', logOut, 2000)
}

function* watchAddPost() {
  yield throttle('ADD_POST_REQUEST', addPost, 2000)
}


export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchAddPost),
  ])
}