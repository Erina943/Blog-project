import { AiOutlinePlus } from "react-icons/ai";
const Create = ({
  getTitle,
  getContent,
  saveTitleToState,
  saveContentToState,
  savePost,
}) => {
  return (
    <>
      <form className="border text-center p-5 my-5 w-50 mx-auto">
        <h1 className="mb-5">Create New Post</h1>
        <input
          type="text"
          ref={getTitle}
          placeholder="title"
          className="form-control mb-3"
          onChange={saveTitleToState}
        />

        <textarea
          ref={getContent}
          placeholder="content"
          className="form-control mb-3"
          onChange={saveContentToState}
        ></textarea>

        <button className="btn btn-primary" onClick={savePost}>
          <AiOutlinePlus className="mb-1" /> Create Post
        </button>
      </form>
    </>
  );
};

export default Create;
