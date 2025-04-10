import React, { useState, useEffect, useRef } from "react";
import Create from "./Create";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";

const List = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => console.log(posts), [posts]);

  const getTitle = useRef(null);
  const getContent = useRef(null);

  function toggleCreate() {
    setIsCreate(!isCreate);
  }

  function saveTitleToState(e) {
    setTitle(e.target.value);
  }

  function saveContentToState(e) {
    setContent(e.target.value);
  }
  function savePost(e) {
    e.preventDefault();
    const id = uuidv4().toUpperCase().slice(0, 11).replace(/-/g, "");
    setPosts([...posts, { id, title, content }]);
    getTitle.current.value = "";
    getContent.current.value = "";
    getTitle.current.focus();
    toggleCreate();
  }

  return (
    <>
      {isCreate ? (
        <Create
          getTitle={getTitle}
          getContent={getContent}
          saveTitleToState={saveTitleToState}
          saveContentToState={saveContentToState}
          savePost={savePost}
        />
      ) : (
        <>
          <div className=" text-center container my-5 p-5">
            <h1 className="mb-5">All Posts</h1>
            {!posts.length ? (
              <div>
                <h3 className="mb-5 text-danger">
                  There is nothing to see here!
                </h3>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => {
                    return (
                      <Post
                        key={post.id}
                        {...post}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                      />
                    );
                  })}
                </tbody>
              </table>
            )}

            <button className="btn btn-primary" onClick={toggleCreate}>
              {" "}
              Create New Post
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default List;
