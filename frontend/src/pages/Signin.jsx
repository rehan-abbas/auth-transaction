import React, { useState } from "react";
import { Heading } from "../components/Header";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Login"} />
          <Subheading label={"Enter your login information"} />
          <InputBox
            label={"Username"}
            placeholder={"joe_doe@gmail.com"}
            onchange={(e) => {
              setusername(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={"123"}
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
            label={"Login"}
          />
        </div>
        <BottomWarning
          label={"create a account?"}
          buttontext={"SignUp"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};
