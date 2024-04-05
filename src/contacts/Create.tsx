import { useState } from "react";
import axios from "axios";
import { ContactData } from "./types";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";

const fieldStyle = "flex flex-col mb-2";

export function Create() {
  const [contacts, setContacts] = useState({} as ContactData);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    event.persist();
    setContacts((contacts) => ({
      ...contacts,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.persist();
    axios.post(`http://localhost:3002/contacts`, contacts);
    navigate("/contacts");
  };

  return (
    <div className="w-96 mx-auto mt-8">
      <h2 className="text-xl text-slate-900 font-bold">New </h2>
      <form className="border-b py-4">
        <div className={fieldStyle}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="first_name"
            value={contacts.first_name}
            onChange={handleChange}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="name"> Last Name</label>
          <input
            type="text"
            id="last_name"
            value={contacts.last_name}
            onChange={handleChange}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={contacts.email}
            onChange={handleChange}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={contacts.phone}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-2 h-10 px-6 font-semibold bg-black text-white"
          onClick={handleSubmit}
        >
          <SaveIcon /> {""}
          Save
        </button>
      </form>
    </div>
  );
}
