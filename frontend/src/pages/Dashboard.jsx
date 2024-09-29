import { Appbar } from "../components/Appbar";
import { useRecoilValue } from "recoil";
import { isAuthorizedSelector } from "../../atoms.jsx/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Balance from "../components/Balance";
import { Users } from "../components/user";

export default function Dashboard() {
  const isAuthorised = useRecoilValue(isAuthorizedSelector);
  const navigate = useNavigate();
  console.log(isAuthorised);

  useEffect(() => {
    if (!isAuthorised) {
      alert("You're Not authorized, Please Sign In");
      navigate("/signIn");
    }
  }, [isAuthorised]);

  return isAuthorised ? (
    <div className="w-full h-screen bg-white p-5">
      <Appbar />
      <Balance />
      <Users />
    </div>
  ) : (
    <></>
  );
}
