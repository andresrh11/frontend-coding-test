export default function Edit() {
  return (
    <>
      <form type="submit">
        <label>
          <h1>Full Name:</h1>
          <input placeholder="type here" value />
        </label>
        <label>
          <h1>Age:</h1>
          <input placeholder="type here" value="age" />
        </label>
        <label>
          <h1>Occupation:</h1>
          <input placeholder="type here" value="occupation" />
        </label>
        <label>
          <h1>Nickname:</h1>
          <input placeholder="type here" value="nickname" />
        </label>
        <label>
          <h1>Gender:</h1>
          <input placeholder="type here" value="gender" />
        </label>
        <label>
          <h1>Picture:</h1>
          <input placeholder="type here" value="picture" />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
