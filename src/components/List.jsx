import React, { useState, useEffect, useRef } from "react";
import Create from "./Create";
import Post from "./Post";
// import { v4 as uuidv4 } from "uuid";
import Edit from "./Edit";

const List = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, title: "t1", content: "c1" },
    { id: 2, title: "t2", content: "c2" },
  ]);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  // useEffect(() => console.log(posts), [posts]);
  // useEffect(() => console.log(editId), [editId]);

  const nextId = useRef(3);
  const getTitle = useRef();
  const getContent = useRef();

  function toggleCreate() {
    setIsCreate(!isCreate);
  }
  function toggleEdit() {
    setIsEdit(!isEdit);
  }
  function editPost(id) {
    toggleEdit();
    setEditId(id);
  }

  function saveTitleToState(e) {
    setTitle(e.target.value);
  }

  function saveContentToState(e) {
    setContent(e.target.value);
  }
  function savePost(e) {
    e.preventDefault();
    const id = nextId.current;
    // const id = uuidv4().toUpperCase().slice(0, 11).replace(/-/g, "");
    setPosts([...posts, { id, title, content }]);
    nextId.current += 1;
    getTitle.current.value = "";
    getContent.current.value = "";
    getTitle.current.focus();
    // setTitle("");
    // setContent("");
    toggleCreate();
  }

  function updatePost(e) {
    e.preventDefault();

    const updatedPost = posts.map((post) => {
      if (post.id === editId) {
        return {
          ...post,
          title: title || post.title,
          content: content || post.content,
        };
      }
      return post;
    });
    setPosts(updatedPost);
    toggleEdit();
    setEditId();
    // setTitle("");
    // setContent("");
  }

  function deletePost(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      const modifiedPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(modifiedPosts);
    }
  }
  if (isCreate) {
    return (
      <>
        <Create
          getTitle={getTitle}
          getContent={getContent}
          saveTitleToState={saveTitleToState}
          saveContentToState={saveContentToState}
          savePost={savePost}
          cancleCreate={toggleCreate}
        />
      </>
    );
  } else if (isEdit) {
    const post = posts.find((post) => {
      return post.id === editId;
    });
    return (
      <Edit
        title={post.title}
        content={post.content}
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        updatePost={updatePost}
        cancleEdit={toggleEdit}
      />
    );
  } else {
    return (
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
                      editPost={editPost}
                      deletePost={deletePost}
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
    );
  }
};

export default List;
