import React from "react";
import { Link, useHistory } from "react-router-dom";

function Login(props) {
  const { onLogin, onLoginState } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    onLoginState(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin({ email, password }).then(() => {
      history.push("/");
    }); /*
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setEmail("");
          setPassword("");
          handleLogin();
          tokenCheck();
          history.push("/");
        } else {
          openToolTip();
        }
      })*/
  };

  return (
    <section className="registration">
      <form
        onSubmit={handleSubmit}
        className="popup__container popup__container_registration"
      >
        <h2 className="popup__title popup__title_registration">Вход</h2>
        <input
          className="popup__input popup__input_registration"
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          minLength="4"
          maxLength="40"
        />
        <span className="popup__span-error" id="name-input-error"></span>
        <input
          className="popup__input popup__input_registration"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="10"
          maxLength="10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="popup__span-error" id="password-input-error"></span>
        <button type="submit" className="popup__button-registration">
          Войти
        </button>
        <Link to="/sign-up" className="popup__span-registration">
          Ещё не зарегистрированы? Регистрация
        </Link>
      </form>
    </section>
  );
}

export default Login;
