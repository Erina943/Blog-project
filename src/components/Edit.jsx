const Edit = ({
  title,
  content,
  saveTitleToState,
  saveContentToState,
  updatePost,
  cancleEdit,
}) => {
  return (
    <>
      <form
        className="border text-center p-5 my-5 w-50 mx-auto"
        onSubmit={updatePost}
      >
        <h1>Edit Post</h1>
        <input
          type="text"
          placeholder="title"
          className="form-control mb-3"
          defaultValue={title}
          onChange={saveTitleToState}
        />

        <textarea
          placeholder="contents"
          className="form-control mb-3"
          defaultValue={content}
          onChange={saveContentToState}
        ></textarea>

        <button className="btn btn-success">Update Post</button>
        <button className="btn btn-secondary" onClick={cancleEdit}>
          Cancle
        </button>
      </form>
    </>
  );
};
export default Edit;
