const Create = ({
  getTitle,
  getContent,
  saveTitleToState,
  saveContentToState,
  savePost,
  cancleCreate,
  isDarkMode,
}) => {
  const formControlClass = isDarkMode
    ? "form-control bg-dark text-white border-secondary"
    : "form-control";

  return (
    <div
      className={`min-vh-100 py-5 ${
        isDarkMode ? "bg-dark text-white" : "bg-light"
      }`}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              className={`card ${
                isDarkMode ? "bg-dark text-white border-secondary" : ""
              } shadow`}
            >
              <div
                className={`card-header ${
                  isDarkMode ? "bg-secondary" : "bg-primary text-white"
                }`}
              >
                <h3 className="card-title mb-0">Create New Post</h3>
              </div>
              <div className="card-body">
                <form onSubmit={savePost}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      ref={getTitle}
                      type="text"
                      className={formControlClass}
                      onChange={saveTitleToState}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Content</label>
                    <textarea
                      ref={getContent}
                      className={formControlClass}
                      rows="6"
                      onChange={saveContentToState}
                    ></textarea>
                  </div>
                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className={`btn ${
                        isDarkMode
                          ? "btn-outline-light"
                          : "btn-outline-secondary"
                      }`}
                      onClick={cancleCreate}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Create Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
