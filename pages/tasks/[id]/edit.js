import Layout from "../../layout";

export default function EditTask() {
  return (
    <>
      <Layout>
        <form type="submit">
          <label>
            <h1>Full Name:</h1>
            <input placeholder="type here" />
          </label>
          <label>
            <h1>Age:</h1>
            <input placeholder="type here" />
          </label>
          <label>
            <h1>Occupation:</h1>
            <input placeholder="type here" />
          </label>
          <label>
            <h1>Nickname:</h1>
            <input placeholder="type here" />
          </label>
          <label>
            <h1>Gender:</h1>
            <input placeholder="type here" />
          </label>
          <label>
            <h1>Picture:</h1>
            <input placeholder="type here" />
          </label>
          <button>Submit</button>
        </form>
      </Layout>
    </>
  );
}
