import Layout from "../../layout";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import styles from "../../../styles/EditTask.module.css";
import validationsTasks from "../../../validationsTasks";
export default function EditTask({ tasks }) {
  const [errors, setErrors] = useState({});
  const [task, setTask] = useState({
    id: tasks[0].id,
    title: "",
    description: "",
    completed: null,
    startDate: tasks[0].startDate,
    endDate: tasks[0].endDate,
    personId: tasks[0].personId,
  });

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    setErrors(validationsTasks({ ...task, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putTask(tasks[0].id, task);
    setTask({
      id: tasks[0].id,
      title: "",
      description: "",
      completed: null,
      startDate: tasks[0].startDate,
      endDate: tasks[0].endDate,
      personId: tasks[0].personId,
    });
  };
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form__task}>
            <label>
              <h1 className={styles.txth1}>Title:</h1>
              <input
              className={styles.ipt}
                placeholder={tasks[0].title}
                name="title"
                onChange={handleInputChange}
              />
              {errors.title && <p className={styles.danger}>{errors.title}</p>}
            </label>
            <label>
              <h1 className={styles.txth1}>Description:</h1>
              <textarea
                placeholder={tasks[0].description}
                name="description"
                onChange={handleInputChange}
                className={styles.txtarea}
              />
              {errors.description && (
                <p className={styles.danger}>{errors.description}</p>
              )}
            </label>
            <label>
              <h1 className={styles.txth1}>Status:</h1>

              <select name="completed" onChange={handleInputChange}>
                <option></option>
                <option value={true}>Completed</option>
                <option value={false}> Not Completed</option>
              </select>

              {errors.completed && (
                <p className={styles.danger}>{errors.completed}</p>
              )}
            </label>
            <button
              type="submit"
              className={
                errors.title || errors.description
                  ? styles.deshabilitado
                  : styles.btn
              }
            >
              Submit
            </button>{" "}
          </form>

          <a href={`/profile/${tasks[0].personId}`} className={styles.txt}>
            {" "}
            Bring me back!
          </a>
        </div>
      </Layout>
    </>
  );
}
async function getAllTasksId() {
  const data = await fetch("http://localhost:3001/tasks");
  const jsondata = await data.json();

  return jsondata.map((e) => ({
    params: {
      id: e.id.toString(),
    },
  }));
}
export async function getTasks(id) {
  const data = await fetch("http://localhost:3001/tasks");
  const jsondata = await data.json();
  const tasks = jsondata.filter((e) => e.id == id);

  return tasks;
}
export async function getStaticPaths() {
  const tasks = await getAllTasksId();

  return {
    paths: tasks,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tasks = await getTasks(params.id);

  return {
    props: {
      tasks,
    },
  };
}

export async function putTask(id, payload) {
  try {
    const res = await axios.put(`http://localhost:3001/tasks/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
