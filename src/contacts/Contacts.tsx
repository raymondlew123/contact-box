import { useEffect, useState } from "react";
import { ContactData } from "./types";
import { getContacts } from "./getContacts";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export function Contacts() {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [filteredResults, setFilteredResults] = useState<ContactData[]>([]);
  const [searchInput, setSearchInput] = useState("");
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

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(contacts);
    }
  };

  function StateHandler() {
    if (contacts?.length === 0) {
      return (
        <div className="text-center p-5 text-xl">
          <h1 className="text-xl text-slate-900">No Data Found</h1>
        </div>
      );
    }
  }

  return (
    <>
      {contacts?.length === 0 && (
        <div className="text-center p-5 text-xl">
          <h1 className="text-xl text-slate-900">No Data Found</h1>
        </div>
      )}
      <div className="w-96 mx-auto mt-8">
        {contacts?.length > 0 && (
          <>
            <h2 className="text-xl text-slate-900 font-bold">Contacts</h2>
            <br></br>
            <form className="max-w-md mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                  onChange={(e) => searchItems(e.target.value)}
                />

                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
            <br></br>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              {searchInput.length > 1 ? (
                filteredResults.map((contact) => {
                  return (
                    <ul className="list-none">
                      <li className="border-b py-4">
                        <p className="text-slate-900 ">
                          Name: {contact.first_name} {contact.last_name}
                        </p>
                        <p className=" text-slate-900 ">
                          Email: {contact.email}
                        </p>
                        <p className=" text-slate-900 ">
                          Phone: {contact.phone}
                        </p>
                      </li>
                    </ul>
                  );
                })
              ) : (
                <ul className="list-none">
                  {reversedContacts.map((contact) => (
                    <li key={contact.id} className="border-b py-4">
                      <p className="text-slate-900 ">
                        Name: {contact.first_name} {contact.last_name}
                      </p>
                      <p className=" text-slate-900 ">Email: {contact.email}</p>
                      <p className=" text-slate-900 ">Phone: {contact.phone}</p>
                      <br></br>
                      <Link to={`/edit/${contact.id}`}>
                        <EditIcon />
                      </Link>
                      {""}
                      <DeleteIcon
                        onClick={(e) => deleteContact(e, contact.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
