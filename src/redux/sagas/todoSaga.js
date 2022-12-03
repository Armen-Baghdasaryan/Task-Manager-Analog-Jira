import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

import { takeEvery, put } from "redux-saga/effects";
import {
  loadStateTodos,
  setTodos,
  successTodos,
  ubdateTodos,
} from "../actions/actionCreator";

// watchers
function* projectSaga() {
  yield takeEvery("CREATE_TODO", createTodotWorker);
  yield takeEvery("GET_TODOS", getTodosWorker);
  yield takeEvery("DELETE_TODO", deleteTodoWorker);
  yield takeEvery("EDIT_TODO", editTodoWorker);
  yield takeEvery("UBDATE_TODO", ubdateTodoWorker);
}

// workers
function* createTodotWorker({ props }) {
  try {
    const res = addDoc(collection(db, "todos"), {
      ...props,
    });
    yield res;
    yield put(ubdateTodos());
  } catch (err) {
    toast(err.message || "Something went wrong");
  }
  yield;
}

function* getTodosWorker() {
  yield put(loadStateTodos(true));
  let list = [];
  try {
    const querySnapshot = yield getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    yield list;
    yield put(setTodos(list));
    yield put(loadStateTodos(false));
  } catch (err) {
    toast(err.message || "Something went wrong");
    yield put(loadStateTodos(false));
  }
}

function* deleteTodoWorker({ id }) {
  try {
    const res = yield deleteDoc(doc(db, "todos", id));
    yield res;
    yield put(ubdateTodos());
    yield put(successTodos(true));
    toast("Todo was deleted");
  } catch (err) {
    toast(err.message || "Something went wrong");
  }
}

function* editTodoWorker({ props }) {
  try {
    const res = yield setDoc(doc(db, "todos", props.id), {
      ...props,
    });
    yield res;
    yield put(ubdateTodos());
    yield put(successTodos(true));
    toast("Changes saved");
  } catch (err) {
    toast(err.message || "Something went wrong");
  }
}

function* ubdateTodoWorker({ props }) {
  try {
    const res = yield setDoc(doc(db, "todos", props.id), {
      ...props,
    });
    yield res;
    yield put(ubdateTodos());
  } catch (err) {
    toast("Comments: Something went wrong");
  }
}

export default projectSaga;
