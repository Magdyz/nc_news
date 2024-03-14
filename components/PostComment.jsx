import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const PostComment = ({ article_id, setCommentPosted }) => {
  const { currentUser } = useContext(UserContext);
  const [postComment, setPostComment] = useState("");
  const [username, setUsername] = useState("");
  const [posted, setPosted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const postUsernameComment = (username, body) => {
    currentUser ? setUsername(currentUser) : username;
    axios
      .post(
        `https://project-nc-news-xu65.onrender.com/api/articles/${article_id}/comments`,
        { username: username, body: body }
      )
      .then(({ data }) => {
        if ({ data }) {
          data ? setLoading(false) : null;
        }
      })
      .catch((error) => {
        console.log("Posting Error", error);
        setError("User not found, try registering!");
      });
  };

  useEffect(() => {
    if (username && postComment && posted) {
      postUsernameComment(username, postComment);
      setPosted(false);
      setLoading(false);
      setCommentPosted(true);
    }
  }, [article_id, postComment, username]);

  const clearForms = () => {
    setUsername("");
    setPostComment("");
  };

  return (
    <>
      <div className="postCommentInput">
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="post a comment..."
          value={postComment}
          onChange={(e) => setPostComment(e.target.value)}
        />
        <button
          onClick={() => {
            setPosted(true);
            postUsernameComment(username, postComment);
            clearForms();
            loading ? <CircularProgress /> : null;
          }}
        >
          post comment
        </button>
      </div>
      {error && <p>{error}</p>}
    </>
  );
};

export default PostComment;
