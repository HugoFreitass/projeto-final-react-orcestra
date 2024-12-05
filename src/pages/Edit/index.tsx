import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/Input";
import Button from "../../components/Button";


const EditAccount: React.FC = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>(user?.nome || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    if (!nome || !email || !senha) {
      setError("Preencha todos os campos!");
      return;
    }

    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "[]");
    const updatedUsers = usersStorage.map((storedUser: any) => {
      if (storedUser.email === user?.email) {
        return { ...storedUser, nome, email, password: senha };
      }
      return storedUser;
    });

    localStorage.setItem("users_db", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "user_token",
      JSON.stringify({ email, token: Math.random().toString(36).substring(2) })
    );

    alert("Dados atualizados com sucesso!");
    navigate("/");
  };

  const handleDelete = () => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "[]");
    const updatedUsers = usersStorage.filter(
      (storedUser: any) => storedUser.email !== user?.email
    );

    localStorage.setItem("users_db", JSON.stringify(updatedUsers));
    signout();
    alert("Conta excluída com sucesso!");
    navigate("/");
  };

  return (
    <S.Container>
      <S.Title>Editar Conta</S.Title>
      <Input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
      />
      <S.Error>{error}</S.Error>
      <Button Text="Salvar Alterações" onClick={handleSave} />
      <S.DeleteButton onClick={handleDelete}>Excluir Conta</S.DeleteButton>
    </S.Container>
  );
};

export default EditAccount;
