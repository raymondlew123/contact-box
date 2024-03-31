import { NewContactData } from "./types";

export async function saveContact(newContactData: NewContactData) {
  const response = await fetch("http://localhost:3001/contacts/", {
    method: "POST",
    body: JSON.stringify(newContactData),
    headers: { "Content-Type": "application/json" },
  });

  const body = (await response.json()) as unknown;

  return { ...newContactData, body };
}
