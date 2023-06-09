import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Sign.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from "../context/ContextProvider";

const Signin = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  // console.log(logdata);

  const { account, setAccount } = useContext(Logincontext)
  // console.log(account);


  const adddata = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logdata

    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json()
    console.log(data)


    if (res.status === 400 || !data) {
      console.log('invalid details')
      toast.warn("Invalid Details!", {
        position: "top-center",
      });
    } else {
      console.log('data valid');
      setAccount(data)
      toast.success("Successfully Logged In!", {
        position: "top-center",
      });
      setData({ ...logdata, email: "", password: "" })
    }

  }


  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={adddata}
                value={logdata.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={logdata.password}
                name="password"
                placeholder="Atleast 8 char"
                id="password"
              />
            </div>
            <button className="signin_btn" onClick={senddata}>continue</button>
            <ToastContainer />
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon</p>
          <NavLink to="/register">
            {" "}
            <button>Create your amazon account</button>{" "}
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Signin;
