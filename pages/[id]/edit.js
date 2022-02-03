import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const EditNote = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const router = useRouter();

  useEffect(() => {
    // updateNote();
  }, []);

  const updateNote = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/notes/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form">
      <h2>Edit Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="sub-form">
          <label>Enter your name:</label>
          <br />
          <input
            type="text"
            label="Title"
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="sub-form2">
          <label>Enter your description:</label>
          <br />
          <input
            type="text"
            label="Descriprtion"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <button className="submit" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

EditNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default EditNote;
