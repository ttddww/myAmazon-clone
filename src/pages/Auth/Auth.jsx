import React, { useContext, useState } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { RingLoader } from "react-spinners";
import { DataContext } from "../../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    SingIn: false,
    SingUp: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "SignIn") {
      // firebase authentication logic
      setLoading({ ...loading, SingIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, SingIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, SingIn: false });
        });
    } else {
      // firebase authentication logic
      setLoading({ ...loading, SingUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, SingUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, SingUp: false });
        });
    }
  };
  return (
    <section>
      <div className={classes.container}>
        {/* logo */}
        <Link to="/">
          <img
            src="https://www.hatchwise.com/wp-content/uploads/2022/08/Amazon-Logo-2000-present-1024x576.jpeg"
            alt="amazon logo"
          />
        </Link>

        {/* form */}
        <div className={classes.login_container}>
          <h3>Sign In</h3>
          {navStateData?.state?.msg && (
            <small
              style={{
                color: "red",
                padding: "10px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {navStateData?.state?.msg}
            </small>
          )}
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            <button
              type="submit"
              name="SignIn"
              onClick={authHandler}
              className={classes.button}
            >
              {loading.SingIn ? (
                <RingLoader color="black" size={20} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <div></div>
          <h5>New to Amazon?</h5>
          <button
            type="submit"
            name="SignUp"
            onClick={authHandler}
            className={classes.btn}
          >
            {loading.SingUp ? (
              <RingLoader color="black" size={20} />
            ) : (
              "Create your Amazon Account"
            )}
          </button>
          {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}
        </div>
      </div>
    </section>
  );
}

export default Auth;
