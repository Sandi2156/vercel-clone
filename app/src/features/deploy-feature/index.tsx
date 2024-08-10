import { useEffect, useState } from "react";
import useSocketConnection from "../../hooks/useSocketConnection";
import Header from "../../components/header";
import { deployProject } from "./api/deploy-project";

function DeployFeature() {
  const [url, setUrl] = useState("");
  const [socket] = useSocketConnection({
    url: "https://vercel-api-server-d0e855b95552.herokuapp.com:9001",
  });
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");

  const clickHandler = async () => {
    const response = await deployProject(url);
    console.log(response?.data?.projectSlug);
    setRoom(response?.data?.projectSlug);
  };

  useEffect(() => {
    if (!room) return;
    console.log("room :", room);

    socket.emit("subscribe", `logs:${room}`);
    socket.on("message", (message) => {
      const logMessage = JSON.parse(message);
      setMessage(logMessage?.log);
    });

    return () => {
      socket.off("message");
    };
  }, [room]);

  return (
    <>
      <Header />

      <div className="bg-tertiary h-screen">
        <div className="space-y-3 pt-28 w-full flex flex-col justify-center items-center">
          <input
            type="text"
            className="py-3 px-5 block w-2/3 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Input text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            type="submit"
            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={clickHandler}
          >
            Deploy
          </button>

          <div>{message}</div>
        </div>
      </div>
    </>
  );
}

export default DeployFeature;
