import React from "react";
import { useState } from "react";
import styles from "./ChangePassword.module.css";


export default function ChangePassword() {

  const controlWord = "тест";
  const [formControlWord, setFormControlWord] = useState(localStorage.getItem("formControlWord") || "");
  const [formPassword, setFormPassword] = useState(localStorage.getItem("formPassword") || "");
  const [formRepeatPassword, setFormRepeatPassword] = useState(localStorage.getItem("formRepeatPassword") || "");

  const [formControlWordErrorStr, setFormControlWordErrorStr] = useState("");
  const [formPasswordErrorStr, setFormPasswordErrorStr] = useState("");
  const [formRepeatPasswordErrorStr, setFormRepeatPasswordErrorStr] = useState("");


  // Сброс информеров ошибок при повторном вводе после неуспешной валидации
  const handleFocusFormControlWord = () => {
    setFormControlWordErrorStr("");
  };

  const handleFocusFormPassword = () => {
    setFormPasswordErrorStr("");
  };

  const handleFocusFormRepeatPassword = () => {
    setFormRepeatPasswordErrorStr("");
  };


  // Изменение локальных стейтов полей (Контролируемый компонент)
  const handleInputFormControlWord = (event) => {
    localStorage.setItem("formControlWord", event.target.value);
    setFormControlWord(event.target.value);
  };

  const handleInputFormPassword = (event) => {
    localStorage.setItem("formPassword", event.target.value);
    setFormPassword(event.target.value);
  };

  const handleInputFormRepeatPassword = (event) => {
    localStorage.setItem("formRepeatPassword", event.target.value);
    setFormRepeatPassword(event.target.value);
  };

  // Валидация полей, set локальных стейтов для ошибок

  const validateControlWord = () => {
    if (formControlWord !== controlWord) {
      setFormControlWordErrorStr("Неверное контрольное слово");
      return false;
    } else {
      setFormControlWordErrorStr("");
      return true;
    }
  };

  const validatePassword = () => {
    if (formPassword.length < 6) {
      setFormPasswordErrorStr("Пароль должен быть не менее 6 символов");
      return false;
    } else {
      setFormPasswordErrorStr("");
      return true;
    }
  };
    
  const validateRepeatPassword = () => {
    if (formRepeatPassword !== formPassword) {
      setFormRepeatPasswordErrorStr("Пароли не совпадают");
      return false;
    } else {
      setFormRepeatPasswordErrorStr("");
      return true;
    }
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (validateControlWord() && validatePassword() && validateRepeatPassword()) {
      setFormControlWord("");
      setFormPassword("");
      setFormRepeatPassword("");

      localStorage.removeItem("formControlWord");
      localStorage.removeItem("formPassword");
      localStorage.removeItem("formRepeatPassword");

      alert("Вы успешно изменили пароль");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmitForm}>

        <div className={styles.formHeader}>
          <img className={styles.logo} src="./logo 2.svg" alt="лого" />
          <legend className={styles.legend}>Изменение пароля</legend>
        </div>

        <div className={styles.inputBlock}>
          <span className={styles.inputs}>
            <input className={styles.input}
              type="text"
              placeholder="Email\Логин" />
          </span>

          <span className={styles.inputs}>
            <input className={formControlWordErrorStr ? styles.inputErr : styles.input}
              type="text"
              placeholder="Контрольное слово" 
              value={formControlWord}
              onInput={handleInputFormControlWord}
              onFocus={handleFocusFormControlWord}/>
              {formControlWordErrorStr && <div className={styles.formErr}>{formControlWordErrorStr}</div>}
          </span>

          <span className={styles.inputs}>
            <input className={styles.input}
              type="password"
              placeholder="Новый пароль" 
              value={formPassword}
              onInput={handleInputFormPassword}
              onFocus={handleFocusFormPassword}/>
              {formPasswordErrorStr && <div className={styles.formErr}>{formPasswordErrorStr}</div>}
          </span>

          <span className={styles.inputs}>
            <input className={styles.input}
              type="password"
              placeholder="Подтверждение пароля" 
              value={formRepeatPassword}
              onInput={handleInputFormRepeatPassword}
              onFocus={handleFocusFormRepeatPassword}/>
              {formRepeatPasswordErrorStr && <div className={styles.formErr}>{formRepeatPasswordErrorStr}</div>}
          </span>
        </div>

        <p className={styles.text}>Обязательные поля</p>

        <div className={styles.btnBlock}>
          <button type="submit" className={styles.btn}>Изменить пароль</button>
          <div className={styles.textBtns}>
            <div type="button" className={styles.textBtn}>Зарегистрироваться</div>
            <div type="button" className={styles.textBtn}>Войти</div>
          </div>

        </div>

      </form>
    </div>

  )
}