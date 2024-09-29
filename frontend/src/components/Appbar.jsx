import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <button
          onClick={() => navigate("/signup")}
          className="flex flex-col justify-center h-full mr-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
