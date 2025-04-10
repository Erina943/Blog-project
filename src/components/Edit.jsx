const Edit = () => {
  return (
    <>
      <form className="border text-center p-5 my-5 w-50 mx-auto">
        <h1>Edit Post</h1>
        <input type="text" placeholder="title" />

        <textarea placeholder="contents"></textarea>

        <button>Update Post</button>
      </form>
    </>
  );
};
export default Edit;
