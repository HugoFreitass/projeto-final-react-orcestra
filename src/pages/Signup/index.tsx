import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [emailConf, setEmailConf] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = () => {
    if (!nome || !email || !emailConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(nome, email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <C.Container>
      <C.Label>Registre-se</C.Label>
      <C.Content>
      <Input
          type="nome"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNome(e.target.value);
            setError("");
          }}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmailConf(e.target.value);
            setError("");
          }}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSenha(e.target.value);
            setError("");
          }}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignup>
          Já tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
