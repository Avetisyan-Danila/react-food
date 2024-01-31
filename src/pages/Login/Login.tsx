import Heading from "../../components/Headling/Heading.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { login, userActions } from "../../store/user.slice.ts";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(userActions.clearLoginError());

    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    dispatch(login({ email: email.value, password: password.value }));
  };

  return (
    <div className={styles["login"]}>
      <Heading>Вход</Heading>
      {loginErrorMessage && (
        <div className={styles["error"]}>{loginErrorMessage}</div>
      )}

      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" placeholder="Email" required />
        </div>

        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="on"
            required
          />
        </div>

        <Button appearance="big">Вход</Button>
      </form>

      <div className={styles["links"]}>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
}
