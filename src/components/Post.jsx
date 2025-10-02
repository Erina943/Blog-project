import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const Post = ({
  displayId,
  id,
  title,
  content,
  editPost,
  deletePost,
  isDarkMode,
}) => {
  const btnClass = isDarkMode ? "btn-outline-light" : "btn-outline-primary";
  return (
    <tr className={isDarkMode ? "table-dark" : ""}>
      <td>{displayId}</td>
      <td>{title}</td>
      <td>
        {content.length > 50 ? `${content.substring(0, 50)}...` : content}
      </td>
      <td>
        <div className="btn-group btn-group-md gap-2 ">
          <button onClick={() => editPost(id)} className={`btn ${btnClass}`}>
            <AiFillEdit className="mb-1 " />
          </button>
          <button
            className="btn btn-outline-danger "
            onClick={() => deletePost(id)}
          >
            <AiFillDelete className="mb-1" />
          </button>
        </div>
      </td>
    </tr>
  );
};
export default Post;
