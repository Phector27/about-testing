import "bootstrap/dist/css/bootstrap.min.css";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import "../../scss/main.scss";
import { Username } from "../App/App";
import Flag, { FlagModes } from "../Flag/Flag";

interface LoginProps {
  onUsernameChange: (username: Username) => void;
  onLogin: (loggedIn: boolean) => void;
}

const Login: FunctionComponent<LoginProps> = ({ onUsernameChange, onLogin }: LoginProps) => {
  let [userName, setUsername] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [error1, setError1] = useState<string | null>(null);
  let [error2, setError2] = useState<string | null>(null);
  let [userLanguage, setUserLanguage] = useState<"EN" | "ES">("EN");

  function login() {
    if (userName.length === 0) {
      setError1("Username too short");
      onLogin(false);
      return;
    }

    if (password.length === 0) {
      setError2("Password too short");
      onLogin(false);
      return;
    }

    onLogin(true);
  }

  useEffect(() => {
    userName.length > 0 ? onUsernameChange(userName) : onUsernameChange(undefined);
  }, [userName, onUsernameChange]);

  return (
    <div className="login">
      <Form.Control
        type="text"
        placeholder="Enter email"
        className="login__username"
        id="username"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
        value={userName}
      />
      {error1 && (
        <Alert variant="danger" dismissible onClose={() => setError1(null)}>
          <span className="login__error1">{error1}</span>
        </Alert>
      )}

      <Form.Control
        type="password"
        className="login__password"
        placeholder="Enter password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      {error2 && (
        <Alert variant="danger" dismissible onClose={() => setError2(null)}>
          {error2}
        </Alert>
      )}
      <Row className="flex w-100 justify-content-between">
        <Flag
          country={userLanguage}
          mode={FlagModes.countryNameAfter}
          onClick={() => {
            userLanguage === "EN" ? setUserLanguage("ES") : setUserLanguage("EN");
          }}
        />
        <Button onClick={() => login()} className="login__login-btn">
          Login
        </Button>
      </Row>
    </div>
  );
};

export default Login;
