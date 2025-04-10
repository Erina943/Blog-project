import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const Post = ({ id, title, content }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>
        <button className="btn btn-primary me-3">
          <AiFillEdit className="mb-1" />
        </button>
        <button className="btn btn-danger">
          <AiFillDelete className="mb-1" />
        </button>
      </td>
    </tr>
  );
};
export default Post;
