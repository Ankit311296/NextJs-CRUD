import { useState } from "react";
import { useRouter } from "next/router";

const NewNote = () => {
  const [form, setForm] = useState({ title: "", description: "" });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    createNote();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createNote = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
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

export default NewNote;
