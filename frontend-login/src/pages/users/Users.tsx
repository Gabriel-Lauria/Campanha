import React, { useEffect, useState } from "react";
import { User } from "./types";
import { getUsers, deleteUser } from "../../services/userService";
import UserModal from "./UserModal";
import { useAuth } from "../../context/AuthContext";
import "./Users.scss";

const Users: React.FC = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadUsers = async () => {
    setUsers(await getUsers());
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="users-page">
      <h2>Usuários</h2>

      {isAdmin && (
        <button
          className="primary-btn"
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
        >
          Novo Usuário
        </button>
      )}

      <table className="users-table">
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
                <button onClick={() => {
                  setEditingUser(u);
                  setShowModal(true);
                }}>
                  Editar
                </button>

                {isAdmin && (
                  <button onClick={() => deleteUser(u.id).then(loadUsers)}>
                    Excluir
                  </button>
                )}
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
    </div>
  );
};

export default Users;
