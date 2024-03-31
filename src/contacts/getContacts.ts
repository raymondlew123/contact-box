export async function getContacts() {
  const response = await fetch("http://localhost:3001/contacts/");
  const body = await response.json();
  return body;
}
