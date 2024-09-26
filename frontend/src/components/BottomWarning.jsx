import { Link } from "react-router-dom";
export function BottomWarning({ label, to, buttontext }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer " to={to}>
        {buttontext}
      </Link>
    </div>
  );
}
