import React, { useEffect, useState } from "react";
import { User } from "./types";
import { createUser, updateUser } from "../../services/userService";
import "./UserModal.scss";

interface Props {
  user: User | null;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ user, onClose }) => {
  const [usuarioNome, setUsuarioNome] = useState("");
  const [role, setRole] = useState("cliente");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (user) {
      setUsuarioNome(user.usuarioNome);
      setRole(user.role);
    } else {
      setUsuarioNome("");
      setRole("cliente");
      setSenha("");
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!usuarioNome) return;

    if (user) {
      await updateUser(user.id, {
        usuarioNome,
        role,
        novaSenha: senha || undefined,
      });
    } else {
      await createUser({
        usuarioNome,
        senha,
        role,
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="user-modal">
        <h3>{user ? "Editar Usuário" : "Novo Usuário"}</h3>

        <div className="form-group">
          <label>Usuário</label>
          <input
            value={usuarioNome}
            onChange={e => setUsuarioNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder={user ? "Deixe em branco para manter" : ""}
          />
        </div>

        <div className="form-group">
          <label>Perfil</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
