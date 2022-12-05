import Link from "next/link";
import { useEffect } from "react";
import Layout from "./layout";

function HomePage({ people }) {
  const cards = people;
  cards.sort(function (a, b) {
    if (a.age > b.age) {
      return 1;
    }
    if (b.age > a.age) {
      return -1;
    }
    return 0;
  });
  useEffect(() => {}, [cards]);
  function handleChange(e) {
    e.preventDefault();
    if (e.target.value === "asc") {
      cards.sort(function (a, b) {
        if (a.age > b.age) {
          return 1;
        }
        if (b.age > a.age) {
          return -1;
        }
        return 0;
      });
    } else {
      cards.sort(function (a, b) {
        if (a.age > b.age) {
          return -1;
        }
        if (b.age > a.age) {
          return 1;
        }
        return 0;
      });
    }
  }
  return (
    <>
      <div>
        <nav>
          <Layout>
            <div className="flex">
              <h2>Order By Age:</h2>
              <select onChange={(e) => handleChange(e)}>
                <option></option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </Layout>
        </nav>
      </div>
      <h1>List Of People</h1>
      <div className="grid gap-4 grid-cols-3 grid-rows-auto">
        {cards.map((e, i) => {
          return (
            <Link href={`/profile/${e.id}`} key={i}>
              <div className="w-6 h-6 cursor-pointer">
                <img src={e.picture} alt={e.fullName} />
                <h1>{e.fullName}</h1>
                <h2>{e.age}</h2>
                <h2>{e.occupation}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
export async function getStaticProps() {
  const data = await fetch("http://localhost:3001/people");
  const jsondata = await data.json();
  return {
    props: { people: jsondata },
  };
}

export default HomePage;
