import { useState, useEffect, useMemo } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./Comments.scss";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getTodos } from "../../redux/actions/actionCreator";
import { createComment } from "../../redux/actions/actionCreator";

const Comments = ({ currentUserId, currentTodo }) => {
  const [activeComment, setActiveComment] = useState(null);
  const [visiable, setVisiable] = useState(false);
  const [isUbdate, setIsUbdate] = useState(false);
  const [curTodo, setCurTodo] = useState(null);
  const [curUser, setCurUser] = useState(null);
  const dispatch = useAppDispatch();

  const randomUsers = useMemo(
    () => [
      { id: "1", userId: "1", name: "Armen" },
      { id: "2", userId: "2", name: "Sergey" },
      { id: "3", userId: "3", name: "Anna" },
    ],
    []
  );

  useEffect(() => {
    setCurTodo(currentTodo);
    const curentUser = randomUsers?.find(
      (user) => user?.userId === Math.ceil(Math.random() * 3).toString()
    );
    setCurUser(curentUser);
  }, [currentTodo, randomUsers]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, isUbdate]);

  const rootComments = curTodo?.comments?.filter(
    (backendComment) => backendComment.parentId === "null"
  );

  const getReplies = (commentId) =>
    curTodo?.comments
      ?.filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text, parentId = "null") => {
    setActiveComment(null);

    dispatch(
      createComment({
        ...curTodo,
        comments: [
          ...curTodo?.comments,
          {
            id: Math.random().toString(36).substr(2, 9),
            body: text,
            parentId,
            userId: "1", // currentUser.id
            username: curUser?.name || "John",
            createdAt: new Date().toISOString(),
          },
        ],
      })
    );
    setTimeout(() => {
      setIsUbdate(!isUbdate);
    }, 1000);
  };

  const updateComment = (text, commentId) => {
    setActiveComment(null);
    dispatch(
      createComment({
        ...curTodo,
        comments: [
          ...curTodo?.comments?.map((item) =>
            item?.id === commentId ? { ...item, body: text } : { ...item }
          ),
        ],
      })
    );
    setTimeout(() => {
      setIsUbdate(!isUbdate);
    }, 1000);
  };

  const deleteComment = (commentId) => {
    dispatch(
      createComment({
        ...curTodo,
        comments: [
          ...curTodo?.comments?.filter((item) => item?.id !== commentId),
        ],
      })
    );

    setTimeout(() => {
      setIsUbdate(!isUbdate);
    }, 500);
  };

  const handleShow = () => {
    setVisiable(!visiable);
  };

  return (
    <div className="comments">
      <div className="comments-title" onClick={handleShow}>
        Comments..
      </div>
      {visiable && (
        <>
          <div className="comment-form-title">Write comment</div>
          <CommentForm submitLabel="Write" handleSubmit={addComment} />
          <div className="comments-container">
            {rootComments?.map((rootComment) => (
              <Comment
                key={rootComment?.id}
                comment={rootComment}
                replies={getReplies(rootComment?.id)}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
