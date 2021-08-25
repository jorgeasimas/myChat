import { takeLatest, put, all, call, takeEvery } from 'redux-saga/effects';
import {auth, provider, createUserProfileDocument, getCurrentUser} from '.././firebase/firebase.utils';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

export const googleSignInStart = () => ({
  type: "GOOGLE_SIGN_IN_START"
});
const signInSuccess = user => ({
  type: "SIGN_IN_SUCCESS",
  payload: user
});

const signInFailure = error => ({
  type: "SIGN_IN_FAILURE",
  payload: error
});
  
const checkUserSession = () => ({
  type: "CHECK_USER_SESSION"
});

export const signOutStart = () => ({
  type: "SIGN_OUT_START"
});

const signOutSuccess = () => ({
  type: "SIGN_OUT_SUCCESS"
});

const signOutFailure = error => ({
  type: "SIGN_OUT_FAILURE",
  payload: error
});

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case "SIGN_OUT_SUCCESS":
      console.log("sign in success")
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case "SIGN_IN_FAILURE":
    case "SIGN_OUT_FAILURE":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    console.log(userSnapshot);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signWithGoogle() {
  console.log("sigining in with google");
  try {
 //  const { user } = yield auth.signWithPopup(provider);
    const {user} = yield call(() => auth.signInWithPopup(provider))
//    auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
    console.log(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}


export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeEvery("GOOGLE_SIGN_IN_START", signWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest("CHECK_USER_SESSION", isUserAuthenticated);
}

export function* onSignOutStart() {
  console.log('signing out')
  yield takeLatest("SIGN_OUT_START", signOut);
}

 function* rootSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(signWithGoogle),
    call(onCheckUserSession),
    call(isUserAuthenticated),
//    call(getSnapshotFromUserAuth),
    call(onSignOutStart)
  ]);
}

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(userReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSagas);
  
  export default store;