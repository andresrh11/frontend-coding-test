import Link from "next/link";
import { useState } from "react";
import styles from "../styles/HomePage.module.css";
import Layout from "./layout";

function HomePage({ people }) {
  const [cards, setCards] = useState(people);

  const handleChange = (e) => {
    if (e.target.value === "desc") {
      setCards(
        people.sort(function (a, b) {
          if (a.age > b.age) {
            return -1;
          }
          if (b.age > a.age) {
            return 1;
          }
          return 0;
        })
      );
    } else {
      setCards(
        people.sort(function (a, b) {
          if (a.age > b.age) {
            return 1;
          }
          if (b.age > a.age) {
            return -1;
          }
          return 0;
        })
      );
    }
  };
  return (
    <>
      {" "}
      <Layout>
        <div>
          <nav>
            <div className={styles.filter}>
              <h2>Order By Age:</h2>
              <Link href="/">
                <select onChange={handleChange} className={styles.select}>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </Link>
            </div>
          </nav>
        </div>
        <h1 className={styles.title}>List Of People</h1>
        <div className={styles.cards}>
          {cards.map((e, i) => {
            return (
              <Link href={`/profile/${e.id}`} key={i}>
                <div className={styles.cards__unit}>
                  <div className={styles.img__div}>
                    <img
                      src={e.picture}
                      alt={e.fullName}
                      className={styles.img__card}
                    />
                  </div>
                  <div className={styles.h1__card}>
                    <h1 className={styles.txt}>{e.fullName}</h1>
                  </div>
                  <h2 className={styles.txt}>{e.age}</h2>
                  <h2 className={styles.txt}>{e.occupation}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const data = await fetch("http://localhost:3001/people");
  const jsondata = await data.json();

  jsondata.sort(function (a, b) {
    if (a.age > b.age) {
      return 1;
    }
    if (b.age > a.age) {
      return -1;
    }
    return 0;
  });

  return {
    props: { people: jsondata },
  };
}
export default HomePage;
