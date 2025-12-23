import React, { useEffect, useState } from "react";
import { User } from "./types";
import { getUsers, deleteUser } from "../../services/userService";
import UserModal from "./UserModal";
import "./Users.scss";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main className="users-page">
      <h2>Usuários</h2>

      <button onClick={() => { setEditingUser(null); setShowModal(true); }}>
        Novo Usuário
      </button>

      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.usuarioNome}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => { setEditingUser(u); setShowModal(true); }}>
                  Editar
                </button>
                <button onClick={() => deleteUser(u.id).then(loadUsers)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserModal
          user={editingUser}
          onClose={() => {
            setShowModal(false);
            loadUsers();
          }}
        />
      )}
    </main>
  );
};

export default Users;
