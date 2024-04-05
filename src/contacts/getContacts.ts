export async function getContacts() {
  const response = await fetch("http://localhost:3002/contacts/");
  const body = await response.json();
  return body;
}
