// import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { Filter } from '../components/Filter/Filter';
import ContactForm from './ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Container } from './App.styled';
import { useEffect } from 'react';

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
    console.log(newContact);

    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts.`)
      : setContacts(prevState => [...prevState, newContact]);
  };

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
// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     // name: '',
//     // number: '',
//     filter: '',
//   };

// addNewContact = ({ name, number, id }) => {
//   const { contacts } = this.state;
//   const newContact = { name, number, id: nanoid() };

//   contacts.find(contact => contact.name.toLowerCase() === name)
//     ? alert(`${name} is already in contacts.`)
//     : this.setState(({ contacts }) => ({
//         contacts: [...contacts, newContact],
//       }));
// };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };
//   deleteBtn = nanoid => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== nanoid),
//     }));
//     console.log(nanoid);
//   };
//   render() {
//     console.log(this.state);

//     const { filter } = this.state;
//     // const { contacts } = this.state;
// const normalizedFilter = this.state.filter.toLowerCase();
// const visibleContacts = this.state.contacts.filter(contact =>
//   contact.name.toLowerCase().includes(normalizedFilter)
//     );

//     return (
// <Container>
//   <h1>Phonebook</h1>
//   <ContactForm onSubmit={this.addNewContact} />
//   <h2>Contacts</h2>
//   <p>Find contacts by name</p>

//   <Filter value={filter} onChange={this.changeFilter} />
//   <ContactList
//     contactList={visibleContacts}
//     onDeleteBtn={this.deleteBtn}
//   />
// </Container>
//     );
//   }
// }
// export default App;
