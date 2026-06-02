import React, { useState } from "react";
import "./auth.css";

export default function Auth({ updateSessionToken }) {
  let [fullName, setFullName] = useState("");
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
}
