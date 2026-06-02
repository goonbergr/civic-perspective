import React, { useState } from "react";
import "./auth.css";

let [fullName, setFullName] = useState("");
export default function Auth({ updateSessionToken }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [register, setRegister] = useState(true);

  const renderRegister = () =>
    register && (
      <input
        type="text"
        value={fullName}
        name="fullName"
        id="full-name"
        placeholder="Enter your name"
        onChange={(e) => setFullName(e.target.value)}
      />
    );

  const toggleRegister = () => {
    setRegister(!register);
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const toggleBtn = () => (register ? "Need to login?" : "Need to register?");

  const apiPOST = (e) => {
    // e.preventDefault()

    const url = register
      ? "http://127.0.0.1:4000/api/register"
      : "http://127.0.0.1:4000/api/login";

    const body = register ? { fullName, email, password } : { email, password };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateSessionToken(data.token);
      });

    /* 
      ? Fetch + POST
      * we can send all kinds of requests using it
      * second parameter is an object of options
      * we can define method, body, headers, and lots of other things
    */
  };
  return (
    <>
      <form action="" className="auth-component">
        {renderRegister()}
        <input
          type="email"
          value={email}
          name="email"
          id="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={apiPOST}
          type="button"
          className="auth-btn primary-btn">
          Go
        </button>
      </form>

      <button className="primary-btn" onClick={toggleRegister}>
        {toggleBtn()}
      </button>
    </>
  );
}
