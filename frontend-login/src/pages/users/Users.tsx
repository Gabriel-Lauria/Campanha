import React, { useState, useEffect } from "react";
import { User, getUsers, createUser, updateUser, deleteUser } from "../../services/userService";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import "./Users.scss";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (user: User) => {
    if (user.id) {
      await updateUser(user);
    } else {
      await createUser(user);
    }
    setModalOpen(false);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="users-page">
      <h1>Gerenciar Usuários</h1>
      <button onClick={() => { setEditingUser(null); setModalOpen(true); }}>+ Novo Usuário</button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {modalOpen && <UserModal user={editingUser} onSave={handleSave} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Users;
