import { useEffect, useState } from "react";
import useSocketConnection from "../../hooks/useSocketConnection";

function DeployFeature() {
  const [url, setUrl] = useState("");
  const [socket] = useSocketConnection({ url: "http://localhost:9001" });
  const [room, setRoom] = useState("");

  const clickHandler = async () => {
    const response = await fetch("http://localhost:9000/project", {
      method: "POST",
      body: JSON.stringify({
        gitURL: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json?.data?.projectSlug);
    setRoom(json?.data?.projectSlug);
  };

  useEffect(() => {
    if (!room) return;
    console.log("room :", room);

    socket.emit("subscribe", `logs:${room}`);
    socket.on("message", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("message");
      // socket.emit("leave", room);
    };
  }, [room]);

  return (
    <>
      <div>Deploy your Project</div>
      <div>Enter your Github Project Url</div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={clickHandler}>Deploy</button>
    </>
  );
}

export default DeployFeature;
