import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import UIButton from "../../UI/Button/Butoon";
import StorageContext from "../../Storage/Context";
import "./Login.css";

function initialState() {
  return { user: "", password: "" };
}

function login({user, password}) {
  if(user === 'admin' && password === 'admin'){
    return { token: '1234'}
  }
  return ({error: 'usuario ou senha invalido'});
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(StorageContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function onSubmit (event) {
    event.preventDefault();

    const {token} = login(values);

    if (token) {
      setToken(token);
      history.push('/');
    }
    setValues(initialState);

  }

  return (

    <div className="user-login corpo">
      <div className="">
       <h1 className="user-login__title">Expo-Veículos</h1>
      </div>

      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
            type="text"
            name="user"
            autoComplete="on"
            onChange={onChange}
            value={values.user}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>

        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
