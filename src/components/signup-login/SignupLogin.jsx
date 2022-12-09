import { IoMdClose } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import c from './SignupLogin.module.css';
import { useState } from 'react';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup({ setactiveLogin }) {
  const { t } = useTranslation();

  const [isLoginSignup, setisLoginSignup] = useState('signup');
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(null);

  const sendResponse = (e) => {
    setError(null)
    e.preventDefault();
    if (isLoginSignup === "signup") {
      createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((response) => {
          if (response.operationType === "signIn") setactiveLogin(false)
        })
        .catch((error) => setError(error.message));
    } else if (isLoginSignup === "login") {
      e.preventDefault();
      signInWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((response) => {
          if (response.operationType === "signIn") setactiveLogin(false)
        })
        .catch((error) => setError(error.message));
    }
  }

  return (
    <div className={c["signup-modal"]}>
      <div className={c["signup-wrapper"]}>
        <div className={c["signup-top"]}>
          {
            isLoginSignup === "signup" ?
              <span>{t("headermain.enter")}</span>
              : <span>Login</span>
          }
          <IoMdClose className={c['signup-close-icon']} onClick={(() => setactiveLogin(false))} />
        </div>
        <div className={c["signup-main"]}>
          <form action="" onSubmit={sendResponse}>
            <span style={{ color: "red" }}>{error}</span>
            <fieldset className={c["signup-main-email"]}>
              <legend htmlFor="">Email <span style={{ color: "#FBC100" }}>*</span></legend>
              <input required type='email' placeholder='Email' onChange={((e) => setInputEmail(e.target.value))} />
            </fieldset>
            <fieldset className={c["signup-main-password"]}>
              <legend htmlFor="">Password</legend>
              <input required type='password' placeholder='Password' onChange={((e) => setInputPassword(e.target.value))} />
            </fieldset>
            {
              isLoginSignup === "signup" ?
                <button type='submit' className={c["signup-submit-button"]}>
                  <p>Ro'yxatdan o'tish</p>
                </button>
                : <button type='submit' className={c["signup-submit-button"]}>
                  <p>Login</p>
                </button>
            }
          </form>
          {
            isLoginSignup === "signup" ?
              <div className={c["signup-login-btn"]} onClick={(() => setisLoginSignup("login"))}>
                <p>Login orqali kirish</p>
              </div>
              : <div className={c["signup-login-btn"]} onClick={(() => setisLoginSignup("signup"))}>
                <p>Ro'yxatdan o'tish</p>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
