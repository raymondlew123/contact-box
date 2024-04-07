import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ContactData } from "./types";
import SaveIcon from "@material-ui/icons/Save";

const fieldStyle = "flex flex-col mb-2";

export function Edit() {
  const { id } = useParams();
  const [contacts, setContacts] = useState({} as ContactData);
  const navigate = useNavigate();

  const getData = async () => {
    const contact = await axios.get(`http://localhost:3002/contacts/${id}`);
    setContacts(contact.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event: any) => {
    event.persist();
    setContacts((contacts) => ({
      ...contacts,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.persist();
    axios
      .patch(`http://localhost:3002/contacts/${id}`, contacts)
      .then((data) => {});
    navigate("/contacts");
  };

  return (
    <div className="w-96 mx-auto mt-8">
      <h2 className="text-xl text-slate-900 font-bold">Edit </h2>
      <form className="border-b py-4" onSubmit={handleSubmit}>
        <div className={fieldStyle}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="first_name"
            value={contacts.first_name}
            required
            onChange={handleChange}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="last_name"
            value={contacts.last_name}
            required
            onChange={handleChange}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={contacts.email}
            required
            onChange={handleChange}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={contacts.phone}
            required
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-2 h-10 px-6 font-semibold bg-black text-white"
        >
          {" "}
          <SaveIcon /> {""}
          Update
        </button>
      </form>
    </div>
  );
}
