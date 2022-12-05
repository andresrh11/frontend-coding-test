import Link from "next/link";

export default function People({ person, tasks }) {
  return (
    <>
      <div>
        <img src={person.picture} />
        <h1>
          {person.fullName} ({person.nickname})
        </h1>
        <h2>{person.occupation} </h2>
        <h3>{person.gender}</h3>
        <h3>{person.age} Years Old</h3>
      </div>
      <div>
        {tasks.map((e, i) => {
          return (
            <div key={i}>
              <h1> {e.title}</h1>
              <p>{e.description}</p>
              <h2>{e.completed ? "Completed" : "Not Completed"}</h2>
              <Link href={`/tasks/${e.id}/edit`}>
                <button>Edit task</button>
              </Link>
              <button>
                {e.completed ? "Mark as not completed" : "Mark as completed"}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <Link href={`/profile/${person.id}/edit`}>
          <button>Edit Information</button>
        </Link>
      </div>
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
