import { useState, useEffect, useRef } from "react";
import CoffeeGrid from "./components/CoffeeGrid";
import coffeeData from "./config/CoffeeData";
import TimeoutScreen from "./components/TimeoutScreen";
import { useIdleTimer } from "react-idle-timer";
import TechKeyboard from "./components/TechKeyboard";
import SugarPanel from "./components/SugarPanel";
import LoadingScreen from "./components/LoadingScreen";
import { VisuallyHidden } from "@chakra-ui/react";

function App() {
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [lines, setLines] = useState<string[]>(["Oczekiwanie na dane"]);
  const [tech, setTech] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://0.0.0.0:8765/");
    ws.current.onopen = () => setWsConnected(true);
    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg && typeof msg.message === "string") {
          const cleanedLines = msg.message
            .split("\n")
            .filter((line: string) => !line.startsWith("LCD Proper:"));
          setLines([...cleanedLines]);
        }
      } catch (err) {
        console.error("Invalid JSON:", event.data);
      }
    };

    ws.current.onerror = () => setWsConnected(false);

    ws.current.onclose = () => {
      setWsConnected(false);
      reconnectTimeout.current = setTimeout(connectWebSocket, 3000);
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) ws.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, []);

  useIdleTimer({
    timeout: 1000 * 120,
    onIdle: () => {
      console.log("User is idle, showing timeout screen");
      setIsTimedOut(true);
    },
    onActive: () => {
      console.log("User active again");
      setIsTimedOut(false);
    },
    debounce: 500,
  });

  const placeOrder = async (servId: string | number) => {
    console.log("id: ", servId);
    try {
      const res = await fetch("order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servId }),
      });
      if (!res.ok) throw new Error("Order failed");
      return await res.json();
    } catch (err) {
      console.error("Order error:", err);
    }
  };

  const handleCoffeeSelection = async (index: number) => {
    const coffee = coffeeData[index];
    if (!coffee) return;
    try {
      await placeOrder(coffee.servId);
    } catch {
      // handle error if needed
    }
  };

  if (isTimedOut && !tech) {
    return <TimeoutScreen />;
  }

  return (
    <>
      {!wsConnected && <p>Reconnecting...</p>}

      {progress > 0 ? (
        <>
          <LoadingScreen progress={progress} ready={ready} />
          <VisuallyHidden>
            <SugarPanel
              onClick={placeOrder}
              lines={lines}
              setTech={setTech}
              setProgress={setProgress}
              setReady={setReady}
            />
          </VisuallyHidden>
        </>
      ) : (
        <>
          <SugarPanel
            onClick={placeOrder}
            lines={lines}
            setTech={setTech}
            setProgress={setProgress}
            setReady={setReady}
          />
          {tech ? <TechKeyboard onClick={placeOrder} /> : null}
          <CoffeeGrid onClick={handleCoffeeSelection} tech={tech} />
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     {!wsConnected && <p>Reconnecting...</p>}
  //     {/* <LoadingScreen progress={progress} /> */}
  //       <SugarPanel
  //       onClick={placeOrder}
  //       lines={lines}
  //       setTech={setTech}
  //       setProgress={setProgress}
  //     />
  //     {tech ? <TechKeyboard onClick={placeOrder} /> : null}
  //     <>
  //       <CoffeeGrid onClick={handleCoffeeSelection} />
  //     </>
  //   </>
  //  );
}

export default App;
