import {
    // addDoc,
    // collection,
    // getDocs,
    doc,
    // deleteDoc,
    setDoc,
  } from "firebase/firestore";
  import { db } from "../../firebase";
  import { toast } from "react-toastify";
  
  import { takeEvery, put } from "redux-saga/effects";
  import { ubdateTodos } from "../actions/actionCreator";
  
  // watchers
  function* commentSaga() {
    yield takeEvery("CREATE_TODO_COMMENT", createTodoComment);
  }
  
  // workers  
  function* createTodoComment({ props }) {
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

//   function* deleteTodoWorker({ id }) {
//     try {
//       const res = yield deleteDoc(doc(db, "todos", id));
//       yield res;
//       yield put(ubdateTodos());
//       yield put(successTodos(true));
//       toast("Todo was deleted");
//     } catch (err) {
//       toast(err.message || "Something went wrong");
//     }
//   }
  
  export default commentSaga;