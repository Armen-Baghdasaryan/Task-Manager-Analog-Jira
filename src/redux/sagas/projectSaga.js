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
  loadStateProjects,
  setProjects,
  ubdateProjects,
} from "../actions/actionCreator";

// watchers
function* projectSaga() {
  yield takeEvery("CREATE_PROJECT", createProjectWorker);
  yield takeEvery("GET_PROJECTS", getProjectsWorker);
  yield takeEvery("DELETE_PROJECT", deleteProjectWorker);
  yield takeEvery("EDIT_PROJECT", editProjectWorker);
}

// workers
function* createProjectWorker({ props }) {
  try {
    const res = addDoc(collection(db, "projects"), {
      ...props,
    });
    yield res;
    yield put(ubdateProjects());
  } catch (err) {
    toast(err.message || "Something went wrong");
  }
  yield;
}

function* getProjectsWorker() {
  yield put(loadStateProjects(true));
  let list = [];
  try {
    const querySnapshot = yield getDocs(collection(db, "projects"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    yield list;
    yield put(setProjects(list));
    yield put(loadStateProjects(false));
  } catch (err) {
    toast(err.message || "Something went wrong");
    yield put(loadStateProjects(false));
  }
}

function* deleteProjectWorker({ id }) {
  try {
    const res = yield deleteDoc(doc(db, "projects", id));
    yield res;
    yield put(ubdateProjects());
    toast("Project was deleted")
  } catch (err) {
    toast(err.message || "Something went wrong");
  }
}

function* editProjectWorker({ props }) {
  try {
    const res = yield setDoc(doc(db, "projects", props.id), {
      ...props,
    });
    yield res;
    yield put(ubdateProjects());
    toast("Changes saved")
  } catch (err) {
    toast(err.message || "Something went wrong");
  }
}

export default projectSaga;
