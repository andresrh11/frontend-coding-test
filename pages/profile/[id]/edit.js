import axios from "axios";
import { useState } from "react";
import Layout from "../../layout";
import styles from "../../../styles/EditTask.module.css";
import validationsProfile from "../../../validations";

export default function Edit({ person }) {
  const [errors, setErrors] = useState({});
  const [persona, setPersona] = useState({
    fullName: "",
    age: "",
    occupation: "",
    nickname: "",
    gender: "",
    picture: "",
  });

  const handleInputChange = (e) => {
    setPersona({
      ...persona,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validationsProfile({ ...persona, [e.target.name]: e.target.value })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putPerson(person.id, persona);
    setPersona({
      fullName: "",
      age: "",
      occupation: "",
      nickname: "",
      gender: "",
      picture: "",
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
              {errors.fullName && (
                <p className={styles.danger}>{errors.fullName}</p>
              )}
            </label>
            <label>
              <h1 className={styles.txth1}>Age:</h1>
              <input
                className={styles.ipt}
                placeholder={person.age}
                name="age"
                onChange={handleInputChange}
              />
              {errors.age && <p className={styles.danger}>{errors.age}</p>}
            </label>
            <label>
              <h1 className={styles.txth1}>Occupation:</h1>
              <input
                className={styles.ipt}
                placeholder={person.occupation}
                name="occupation"
                onChange={handleInputChange}
              />
              {errors.occupation && (
                <p className={styles.danger}>{errors.occupation}</p>
              )}
            </label>
            <label>
              <h1 className={styles.txth1}>Nickname:</h1>
              <input
                className={styles.ipt}
                placeholder={person.nickname}
                name="nickname"
                onChange={handleInputChange}
              />
              {errors.nickname && (
                <p className={styles.danger}>{errors.nickname}</p>
              )}
            </label>
            <label>
              <h1 className={styles.txth1}>Gender:</h1>
              <input
                className={styles.ipt}
                placeholder={person.gender}
                name="gender"
                onChange={handleInputChange}
              />
              {errors.gender && (
                <p className={styles.danger}>{errors.gender}</p>
              )}
            </label>
            <label>
              <h1 className={styles.txth1}>Picture:</h1>
              <input
                className={styles.ipt}
                placeholder={person.picture}
                name="picture"
                onChange={handleInputChange}
              />
              {errors.picture && (
                <p className={styles.danger}>{errors.picture}</p>
              )}
            </label>
            <button
              type="submit"
              className={
                errors.fullName ||
                errors.age ||
                errors.nickname ||
                errors.occupation ||
                errors.picture ||
                errors.gender
                  ? styles.deshabilitado
                  : styles.btn
              }
            >
              Submit
            </button>
          </form>
          <a href={`/profile/${person.id}`} className={styles.txt}>
            {" "}
            Bring me back!
          </a>
          <a
            href="https://www.linkpicture.com/en/?set=en"
            target="_blank"
            rel="noreferrer"
          >
            <button className={styles.btn__info}>
              Get your picture link here
            </button>
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
