// import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { Filter } from '../components/Filter/Filter';
import ContactForm from './ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Container } from './App.styled';


export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  
  const addNewContact = ({ name, number, id }) => {
    
    const newContact = { name, number, id };
    
    const checkedNumber=contacts.find(contact => contact.number === number);
    
    if(contacts.some(contact=>contact.name===name)){
      return alert(`Contact with name "${name}" is already in contacts`);
    } else if(checkedNumber){
      return alert(
        `Contact with number ${checkedNumber.number} is already in  ${checkedNumber.name}`
      );
    }
    else{
      setContacts(prevContacts=>[...prevContacts, newContact])
    }}

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  const deleteBtn = nanoid => {
    setContacts(contacts.filter(contact => contact.id !== nanoid));
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contactList={visibleContacts} onDeleteBtn={deleteBtn} />
    </Container>
  );
}

