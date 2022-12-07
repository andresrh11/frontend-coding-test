import Layout from "../../layout";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import styles from "../../../styles/EditTask.module.css";
export default function EditTask({ tasks }) {
  console.log(tasks);
  const [task, setTask] = useState({
    id: tasks[0].id,
    title: tasks[0].title,
    description: tasks[0].description,
    completed: tasks[0].completed,
    startDate: tasks[0].startDate,
    endDate: tasks[0].endDate,
    personId: tasks[0].personId,
  });

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putTask(tasks[0].id, task);
    setTask({
      id: tasks[0].id,
      title: tasks[0].title,
      description: tasks[0].description,
      completed: tasks[0].completed,
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
                placeholder={tasks[0].title}
                name="title"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1 className={styles.txth1}>Description:</h1>
              <textarea
                placeholder={tasks[0].description}
                name="description"
                onChange={handleInputChange}
                className={styles.txtarea}
              />
            </label>
            <label>
              <h1 className={styles.txth1}>Status:</h1>

              {tasks[0].completed === true ? (
                <select name="completed" onChange={handleInputChange}>
                  <option value={true}>Completed</option>
                  <option value={false}> Not Completed</option>
                </select>
              ) : (
                <select name="completed" onChange={handleInputChange}>
                  <option value={false}> Not Completed</option>
                  <option value={true}>Completed</option>
                </select>
              )}
            </label>
            <button type="submit" className={styles.btn}>Submit</button>{" "}
          </form>

          <a href={`/profile/${tasks[0].personId}`} className={styles.txt}> Volver Atrás</a>
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
