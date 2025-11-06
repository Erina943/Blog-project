import React, { useState, useEffect, useRef } from "react";
import Create from "./Create";
import Post from "./Post";
import Edit from "./Edit";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const List = () => {
  const { isDarkMode } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [validateErr, setValidateErr] = useState([]);

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("profilePhoto") || null
  );

  const getTitle = useRef();
  const getContent = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("Authentication token not found.");
      return;
    }
    await axios
      .get("https://blog-three-gules-72.vercel.app/blog", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePhoto");
    navigate("/login");
  };

  const savePost = async (event) => {
    event.preventDefault();
    if (title && content) {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        console.error("Authentication token not found.");
        return;
      }
      await axios.post(
        "https://blog-three-gules-72.vercel.app/blog",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
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
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        console.error("Authentication token not found.");
        return;
      }
      await axios.put(
        `https://blog-three-gules-72.vercel.app/blog/${editId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      fetchPost();

      getTitle.current.value = "";
      getContent.current.value = "";
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
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("Authentication token not found.");
      return;
    }
    if (confirmed) {
      await axios.delete(` https://blog-three-gules-72.vercel.app/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      fetchPost();
    }
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoData = reader.result;
        localStorage.setItem("profilePhoto", photoData);
        setProfilePhoto(photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  const tableClass = isDarkMode ? "table table-dark" : "table";
  const cardClass = isDarkMode ? "card bg-dark text-white" : "card";
  const containerClass = isDarkMode
    ? "bg-dark text-white min-vh-100"
    : "bg-light min-vh-100";

  if (isCreate) {
    return (
      <Create
        getTitle={getTitle}
        getContent={getContent}
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        savePost={savePost}
        cancleCreate={toggleCreate}
        isDarkMode={isDarkMode}
      />
    );
  } else if (isEdit) {
    const post = posts.find((post) => post.id === editId);
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
  }

  return (
    <div className={containerClass}>
      <nav
        className={`navbar ${
          isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-primary"
        } shadow-sm`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <span className="navbar-brand mb-0 h1">React Blog</span>
          <div className="d-flex align-items-center gap-3">
            <ThemeToggle />

            <div className="dropdown">
              <img
                src={profilePhoto || "/avatar_13482193.png"}
                alt="Profile"
                className="rounded-circle border border-2 border-white object-fit-cover"
                width="40"
                height="40"
                data-bs-toggle="dropdown"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />

              <ul
                className="dropdown-menu dropdown-menu-end p-2"
                style={{ minWidth: "180px" }}
              >
                <li className="text-center mb-2">
                  <label
                    htmlFor="profile-upload"
                    className="btn btn-sm btn-outline-primary w-100"
                    style={{ fontWeight: "500" }}
                  >
                    {profilePhoto ? "Change Photo" : "Upload Photo"}
                  </label>
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleProfileUpload}
                  />
                </li>

                <li>
                  <button
                    className="dropdown-item text-danger text-center fw-bold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
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
                    <p>Create your first post to get started.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className={`${tableClass} table-striped`}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Content</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post, index) => (
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
                        ))}
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
  );
};

export default List;
