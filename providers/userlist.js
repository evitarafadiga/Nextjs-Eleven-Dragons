import {createContext, useState} from 'react';

export const ListContext = createContext({});

export const ListProvider = ({children}) => {

  const [userlist = [], setList] = useState([]);

  function handleAddUser(name, email, status) {
    const user = { name, email, status };
    setList([...userlist, user]);
  }

  function activeFilter(user) {
    return user.status === 'active';
  }

  function handleRemoveUserFromList() {
    const filteredList = userlist.filter(activeFilter);
    setList(filteredList);
  }

  function clearList() {
    setList([]);
  }

  return (
    <ListContext.Provider value={{ userlist, setList, handleAddUser, handleRemoveUserFromList, clearList }}>
      {children}
    </ListContext.Provider>
  );
}