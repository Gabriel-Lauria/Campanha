import React, { useState, useEffect } from "react";
import { User } from "../../services/userService";

interface Props {
  user: User | null;
  onSave: (user: User) => void;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ user, onSave, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
    } else {
      setUsername("");
      setEmail("");
      setRole("");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: user?.id, username, email, role });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{user ? "Editar Usuário" : "Novo Usuário"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required />
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
