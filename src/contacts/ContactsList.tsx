import { ContactData } from "./types";

type Props = {
  contacts: ContactData[];
};
export function ContactsList({ contacts }: Props) {
  return (
    <ul className="list-none">
      {contacts.map((contact) => (
        <li key={contact.id} className="border-b py-4">
          <p className="text-slate-900 ">Name: {contact.name}</p>
          <p className=" text-slate-900 ">Email: {contact.email}</p>
          <p className=" text-slate-900 ">Phone: {contact.phone}</p>
        </li>
      ))}
    </ul>
  );
}
