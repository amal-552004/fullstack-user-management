import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Notification from './components/Notification';

function App() {
  const [users, setUsers] = useState([]);
  const [notif, setNotif] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch {
      setNotif({ type: 'error', message: 'Erreur chargement utilisateurs' });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
      {notif && <Notification type={notif.type} message={notif.message} />}
      <UserForm onSuccess={fetchUsers} setNotif={setNotif} />
      <UserList users={users} onRefresh={fetchUsers} setNotif={setNotif} />
    </div>
  );
}

export default App;
