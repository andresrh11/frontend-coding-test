import axios from "axios";

import { useState } from "react";
import Layout from "../../layout";
import styles from "../../../styles/EditTask.module.css";
export default function Edit({ person }) {
  const [persona, setPersona] = useState({
    fullName: person.fullName,
    age: person.age,
    occupation: person.occupation,
    nickname: person.nickname,
    gender: person.gender,
    picture: person.picture,
  });

  const handleInputChange = (e) => {
    setPersona({
      ...persona,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putPerson(person.id, persona);
    setPersona({
      fullName: person.fullName,
      age: person.age,
      occupation: person.occupation,
      nickname: person.nickname,
      gender: person.gender,
      picture: person.picture,
    });
  };
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form__task}>
            <label>
              <h1 className={styles.txth1}>Full Name:</h1>
              <input
                className={styles.ipt}
                placeholder={person.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1 className={styles.txth1}>Age:</h1>
              <input
                className={styles.ipt}
                placeholder={person.age}
                name="age"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1 className={styles.txth1}>Occupation:</h1>
              <input
                className={styles.ipt}
                placeholder={person.occupation}
                name="occupation"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1 className={styles.txth1}>Nickname:</h1>
              <input
                className={styles.ipt}
                placeholder={person.nickname}
                name="nickname"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1 className={styles.txth1}>Gender:</h1>
              <input
                className={styles.ipt}
                placeholder={person.gender}
                name="gender"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1 className={styles.txth1}>Picture:</h1>
              <input
                className={styles.ipt}
                placeholder={person.picture}
                name="picture"
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" className={styles.btn}>
              Submit
            </button>
          </form>
          <a href={`/profile/${person.id}`} className={styles.txt}>
            {" "}
            Volver Atrás
          </a>
        </div>
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
export async function putPerson(id, payload) {
  try {
    console.log(payload);
    const res = await axios.put(`http://localhost:3001/people/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
