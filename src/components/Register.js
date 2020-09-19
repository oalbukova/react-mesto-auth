import React from "react";
import { Link, useHistory } from "react-router-dom";

function Register(props) {
  const { onRegister, successToolTip, openToolTip, onLoginState } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    onLoginState(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onRegister({ email, password })
      .then(() => {
        successToolTip();
        setTimeout(openToolTip, 1000);
        history.push("/sign-in");
      })
      .catch(() => {
        openToolTip();
      });
  };

  return (
    <section className="registration">
      <form
        onSubmit={handleSubmit}
        className="popup__container popup__container_registration"
      >
        <h2 className="popup__title popup__title_registration">Регистрация</h2>
        <input
          className="popup__input popup__input_registration"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          minLength="4"
          maxLength="40"
        />
        <span className="popup__span-error" id="name-input-error"></span>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="popup__input popup__input_registration"
          required
          placeholder="Пароль"
          minLength="10"
          maxLength="10"
        />
        <span className="popup__span-error" id="password-input-error"></span>
        <button type="submit" className="popup__button-registration">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="popup__span-registration">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default Register;
