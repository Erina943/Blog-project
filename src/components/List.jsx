import React, { useState, useEffect, useRef } from "react";
import Create from "./Create";
import Post from "./Post";
import Edit from "./Edit";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const List = () => {
  const { isDarkMode } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [validateErr, setValidateErr] = useState([]);

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const getTitle = useRef();
  const getContent = useRef();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const blog = await axios.get("http://localhost:4000/blog");

    setPosts(blog.data);
  };

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

  const savePost = async (event) => {
    event.preventDefault();
    if (title && content) {
      await axios.post("http://localhost:4000/blog", { title, content });
      fetchPost();

      getTitle.current.value = "";
      getContent.current.value = "";
      toggleCreate();

      setValidateErr([]);
    } else {
      let err = [];
      if (!title) err["title"] = "This field is required!";
      if (!content) err["content"] = "This field is required!";

      setValidateErr(err);
    }
  };

  const updatePost = async (event) => {
    event.preventDefault();
    if (title && content) {
      await axios.put(`http://localhost:4000/blog/${editId}`, {
        title,
        content,
      });
      fetchPost();

      getTitle.current.value = " ";
      getContent.current.value = " ";
      setIsEdit(false);

      setValidateErr([]);
    } else {
      let err = {};
      if (!title) err["title"] = "This field is required!";
      if (!content) err["content"] = "This field is required!";

      setValidateErr(err);
    }
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:4000/blog/${id}`);
    fetchPost();
  };

  const tableClass = isDarkMode ? "table table-dark" : "table";
  const cardClass = isDarkMode ? "card bg-dark text-white" : "card";
  const containerClass = isDarkMode
    ? "bg-dark text-white min-vh-100"
    : "bg-light min-vh-100";

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
          isDarkMode={isDarkMode}
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
        getTitle={getTitle}
        getContent={getContent}
        isDarkMode={isDarkMode}
      />
    );
  } else {
    return (
      <>
        <div className={containerClass}>
          <nav
            className={`navbar ${
              isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-primary"
            } shadow-sm`}
          >
            <div className="container">
              <span className="navbar-brand mb-0 h1">React Blog</span>
              <ThemeToggle />
            </div>
          </nav>

          <div className="container my-5 p-4">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className={cardClass}>
                  <div
                    className={`card-header ${
                      isDarkMode ? "bg-secondary" : "bg-primary text-white"
                    }`}
                  >
                    <h1 className="text-center mb-0">All Posts</h1>
                  </div>
                  <div className="card-body">
                    {!posts.length ? (
                      <div className="text-center py-4">
                        <h3 className="text-danger">
                          There is nothing to see here!
                        </h3>
                        <p className="">
                          Create your first post to get started.
                        </p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className={`${tableClass} table-striped`}>
                          <thead>
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Title</th>
                              <th scope="col">Content</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {posts.map((post, index) => {
                              return (
                                <Post
                                  key={post.id}
                                  id={post.id}
                                  displayId={index + 1}
                                  title={post.title}
                                  content={post.content}
                                  editPost={editPost}
                                  deletePost={deletePost}
                                  isDarkMode={isDarkMode}
                                />
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="text-center mt-4">
                      <button
                        className={`btn ${
                          isDarkMode ? "btn-outline-light" : "btn-primary"
                        } btn-lg`}
                        onClick={toggleCreate}
                      >
                        Create New Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default List;
