import { useState, useEffect, useMemo } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import { ubdateTodo } from "../../redux/actions/actionCreator";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./Comments.scss";
import DeleteModal from "../Modals/DeleteModal";

const Comments = ({ currentUserId, currentTodo, isUbdate, setIsUbdate }) => {
  const [activeComment, setActiveComment] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [visiable, setVisiable] = useState(false);
  const [curTodo, setCurTodo] = useState(null);
  const [currentId, setCurrenttId] = useState("");
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
      ubdateTodo({
        ...curTodo,
        comments: [
          ...curTodo?.comments,
          {
            id: Math.random().toString(36).substr(2, 9),
            body: text,
            parentId,
            userId: curUser?.userId || "1",
            username: curUser?.name || "Armen",
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
      ubdateTodo({
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
    setCurrenttId(commentId);
    setOpenDeleteModal(true);
  };

  const handleShow = () => {
    setVisiable(!visiable);
  };

  return (
    <>
      <div className="comments">
        <div className="comments-title" onClick={handleShow}>
          {!visiable ? "Comments" : "Hide"} :
          <span className="comments_count">{curTodo?.comments?.length}</span>
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
      <DeleteModal
        props={{
          open: openDeleteModal,
          setOpen: setOpenDeleteModal,
          deleteItem: curTodo,
          itemId: currentId,
          deleteText: null,
          isUbdate,
          setIsUbdate,
          deleteType: "Comment",
          type: "DelComment",
        }}
      />
    </>
  );
};

export default Comments;
