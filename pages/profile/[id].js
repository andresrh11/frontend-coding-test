import Link from "next/link";

export default function People({ person }) {
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
        <Link href={`/profile/${person.id}/edit`}>
          <button >Edit Information</button>
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
export async function getStaticPaths() {
  const people = await getAllPeopleId();

  return {
    paths: people,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  console.log(params);
  const person = await getPersonData(params.id);
  console.log(person);
  return {
    props: {
      person,
    },
  };
}
