import React, { useState } from "react";
import { Heading } from "../components/Header";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Signup"} />
          <Subheading label={"Enter the information to create account"} />
          <InputBox
            label={"First Name"}
            placeholder={"joe"}
            onchange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onchange={(e) => {
              setlastName(e.target.value);
            }}
          />
          <InputBox
            label={"Email"}
            placeholder={"joe_doe@gmail.com"}
            onchange={(e) => {
              setusername(e.target.value);
            }}
          />
          <InputBox
            label={"password"}
            placeholder={1234}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4" />
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:4000/api/v1/user/signup",
                {
                  firstName,
                  lastName,
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            label={"Sign up"}
          />
        </div>
        <BottomWarning
          label={"Already have an account?"}
          buttontext={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
