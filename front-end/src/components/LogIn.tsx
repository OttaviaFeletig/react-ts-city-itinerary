import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import axios from "axios";
import Browse from "./Browse";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const LogIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // eslint-disable-next-line
  const [currentUser, setToken] = useContext(CurrentUserContext);
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    if (!email || !password) {
      alert("Enter email and password!");
    } else {
      const logIn = async () => {
        try {
          let res = await axios.post(`${backendUrl}users/log-in`, {
            email,
            password
          });
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
        } catch (err) {
          alert(err.response.request.response);
        }
      };
      logIn();
      setEmail("");
      setPassword("");
    }
  };

  const handleTestLogin = () => {
    setEmail("whatever@gmail.com");
    setPassword("fdsafdsa1");
  };

  return (
    <section className="conatiner mb-3">
      <div className="text-center">
        {currentUser && currentUser.email ? (
          <Fragment>
            <h1>Logged in successfully!</h1>
            <Browse />
          </Fragment>
        ) : (
          <Fragment>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
              <div className="d-flex justify-content-center">
                <label className="col-form-label mr-1" htmlFor="email">
                  Email:
                </label>
                <div className="flex-shrink-0">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <label className="col-form-label mr-1" htmlFor="password">
                  Password:
                </label>
                <div className="flex-shrink-0">
                  <input
                    className="form-control"
                    id="password"
                    type="password"
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <button className="btn btn-primary">Log in</button>
              </div>
            </form>
            {process.env.NODE_ENV === "development" && (
              <Fragment>
                <h3 className="pt-3">Dev Test Login</h3>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleTestLogin}>
                  Fill the form
                </button>
              </Fragment>
            )}
            <h2 className="pt-3">Not registered yet?</h2>
            <Link to="/create-account">
              <Button variant="link" style={{ marginRight: ".25rem" }}>
                Create an account
              </Button>
            </Link>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default LogIn;
