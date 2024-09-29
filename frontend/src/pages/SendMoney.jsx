import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [IsPostSuccessful, setIsPostSuccessful] = useState(false);
  const [ShowAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      "http://localhost:4000/api/v1/account/transaction",
                      {
                        to: id,
                        amount,
                      },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );

                    if (response && response.status === 200) {
                      setIsPostSuccessful(true);
                      setShowAnimation(true);

                      setTimeout(() => {
                        setShowAnimation(false);
                        navigate("/dashboard");
                      }, 1340);
                    }
                  } catch (error) {
                    console.error("Error with POST request:", error);
                    setIsPostSuccessful(false);
                    
                  }
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
              <div>
                {IsPostSuccessful && ShowAnimation && (
                  <iframe
                    src="https://lottie.host/embed/90ca70d8-8517-4f12-be22-1bf6f625cfd3/vxODck7ufK.json"
                    title="Success Animation"
                    style={{ width: "300px", height: "300px", border: "none" }}
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
