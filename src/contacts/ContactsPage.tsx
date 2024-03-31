import { useEffect, useState } from "react";
import { getContacts } from "./getContacts";
import { ContactData, NewContactData } from "./types";
import { ContactsList } from "./ContactsList";
import { saveContact } from "./saveContact";
import { NewContactForm } from "./NewContactForm";

export function ContactsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactData[]>([]);

  useEffect(() => {
    let cancel = false;
    getContacts().then((data) => {
      if (!cancel) {
        setContacts(data);
        setIsLoading(false);
      }
    });
  }, []);
  if (isLoading) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }
  async function handleSave(newContactData: NewContactData) {
    const newContact = await saveContact(newContactData);
    setContacts([newContact, ...contacts]);
  }

  return (
    <>
      <div className="grid  grid-cols-2 gap-12 ">
        <div className="w-96 mx-auto mt-8">
          <NewContactForm onSave={handleSave} />
        </div>
        <ContactsList contacts={contacts} />
      </div>
    </>
  );
}
