import { useEffect, useState } from "react";
import { ContactData } from "./types";
import { getContacts } from "./getContacts";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

type Props = {
  contacts: ContactData[];
};

export function Contacts() {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  let reversedContacts = [...contacts].reverse();

  useEffect(() => {
    let cancel = false;
    getContacts().then((data) => {
      if (!cancel) {
        setContacts(data);
        setIsLoading(false);
        console.log("contacts:", contacts);
      }
    });
  }, []);

  if (isLoading) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }

  const deleteContact = async (event: any, id: string) => {
    event.persist();
    await axios.delete(`http://localhost:3002/contacts/${id}`).then((res) => {
      getContacts();
      const Data = res.data;
      setContacts([...contacts, Data]);

      window.location.reload();
    });
  };

  return (
    <div className="w-96 mx-auto mt-8">
      <ul className="list-none">
        {reversedContacts.map((contact) => (
          <li key={contact.id} className="border-b py-4">
            <p className="text-slate-900 ">
              Name: {contact.first_name} {contact.last_name}
            </p>
            <p className=" text-slate-900 ">Email: {contact.email}</p>
            <p className=" text-slate-900 ">Phone: {contact.phone}</p>
            <Link to={`/edit/${contact.id}`}>
              <EditIcon />
            </Link>
            {""}
            <DeleteIcon onClick={(e) => deleteContact(e, contact.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
