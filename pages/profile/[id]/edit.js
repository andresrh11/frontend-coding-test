import Layout from "../../layout";

export default function Edit({ person }) {
  return (
    <>
      <Layout>
        <form type="submit">
          <label>
            <h1>Full Name:</h1>
            <input placeholder={person.fullName} />
          </label>
          <label>
            <h1>Age:</h1>
            <input placeholder={person.age} />
          </label>
          <label>
            <h1>Occupation:</h1>
            <input placeholder={person.occupation} />
          </label>
          <label>
            <h1>Nickname:</h1>
            <input placeholder={person.nickname} />
          </label>
          <label>
            <h1>Gender:</h1>
            <input placeholder={person.gender} />
          </label>
          <label>
            <h1>Picture:</h1>
            <input placeholder={person.picture} />
          </label>
          <button>Submit</button>
        </form>
      </Layout>
    </>
  );
}
async function getAllPeopleId() {
  const data = await fetch("http://localhost:3001/people");
  const jsondata = await data.json();
  return jsondata.map((e) => ({
    params: {
      id: e.id.toString(),
    },
  }));
}
async function getPersonData(id) {
  const data = await fetch("http://localhost:3001/people");
  const jsondata = await data.json();
  const person = jsondata.find((e) => e.id == id);
  return person;
}
export async function getTasks(id) {
  const data = await fetch("http://localhost:3001/tasks");
  const jsondata = await data.json();
  const tasks = jsondata.filter((e) => e.personId == id);

  return tasks;
}

export async function getStaticPaths() {
  const people = await getAllPeopleId();

  return {
    paths: people,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const person = await getPersonData(params.id);
  const tasks = await getTasks(params.id);

  return {
    props: {
      person,
      tasks,
    },
  };
}
