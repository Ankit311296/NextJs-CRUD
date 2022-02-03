import Link from "next/link";
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/notes");
  const data = await res.json();

  return {
    props: {
      note: data,
    },
  };
};

export default function Home({ note }) {
  return (
    <>
      <div className="row">
        {note.data.reverse().map((d) => {
          return (
            <div className="column" key={d._id}>
              <h2 className="title">{d.title}</h2>
              <p>{d.description}</p>
              <div className="btn">
                <button className="btn1">
                  <Link href={d._id}>View</Link>
                </button>
                <button className="btn2">
                  <Link href={`${d._id}/edit`}>Edit</Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
