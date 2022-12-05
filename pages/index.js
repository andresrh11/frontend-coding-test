import Link from "next/link";
import axios from "axios";
function HomePage({ people }) {
  return (
    <>
      <div></div>
      <div className="grid gap-4 grid-cols-3 grid-rows-auto">
        {people.map((e, i) => {
          return (
            <Link href={`/profile/${e.id}`}>
              <div key={i} className="w-6 h-6 cursor-pointer">
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
  jsondata.sort(function (a, b) {
    if (a.age > b.age) {
      return 1;
    }
    if (b.age > a.age) {
      return -1;
    }
    return 0;
  });
  console.log(data);
  return {
    props: { people: jsondata },
  };
}

export default HomePage;
