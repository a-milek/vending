import { useState, useEffect, useRef, useCallback } from "react";
import { Box, VisuallyHidden } from "@chakra-ui/react";
import { useIdleTimer } from "react-idle-timer";

import CoffeeGrid from "./components/CoffeeGrid";
import coffeeData from "./config/CoffeeData";
import TimeoutScreen from "./components/TimeoutScreen";
import TechKeyboard from "./components/TechKeyboard";
import SugarPanel from "./components/SugarPanel";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  // --- UI & state control ---
  const [isTimedOut, setIsTimedOut] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);
  const [lines, setLines] = useState<string[]>(["Oczekiwanie na dane"]);
  const [tech, setTech] = useState(false);
  const [progress, setProgress] = useState(1);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Price & order control ---
  const [current, setCurrentPrice] = useState<number | null>(null);
  const currentPriceRef = useRef<number | null>(null);
  const getCurrentPrice = useCallback(() => currentPriceRef.current, []);
  useEffect(() => {
    currentPriceRef.current = current;
  }, [current]);

  // --- Coffee List ---
  const [coffeeList, setCoffeeList] = useState(() => {
    const stored = localStorage.getItem("coffee-prices");
    return stored ? JSON.parse(stored) : coffeeData;
  });
  useEffect(() => {
    localStorage.setItem("coffee-prices", JSON.stringify(coffeeList));
  }, [coffeeList]);

  // --- Prevent dragging images ---
  useEffect(() => {
    document
      .querySelectorAll("img")
      .forEach((img) => img.setAttribute("draggable", "false"));
  }, []);

  // --- WebSocket Handling ---
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connectWebSocket = useCallback(() => {
    ws.current = new WebSocket("ws://0.0.0.0:8765/");
    ws.current.onopen = () => setWsConnected(true);

    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg?.message) {
          const cleanedLines = msg.message
            .split("\n")
            .filter((line: string) => !line.startsWith("LCD Proper:"));
          setLines(cleanedLines);
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
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      ws.current?.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [connectWebSocket]);

  // --- Idle Timer ---
  useIdleTimer({
    timeout: 1000 * 120,
    onIdle: () => setIsTimedOut(true),
    onActive: () => setIsTimedOut(false),
    debounce: 500,
  });

  // --- Order Logic ---
  const placeOrder = async (servId: string | number) => {
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
    const coffee = coffeeList[index];
    if (!coffee) return;
    try {
      await placeOrder(coffee.servId);
    } catch {}
  };

  // --- Timeout view ---
  if (isTimedOut && !tech) return <TimeoutScreen />;

  // --- Main view ---
  return (
    <Box
      bg={tech ? "red" : "black"}
      minH="100vh"
      minW="100vw"
      alignContent="center"
    >
      {!wsConnected && <p>Reconnecting...</p>}

      {loading || ready ? (
        <>
          <LoadingScreen progress={progress} ready={ready} />
          <VisuallyHidden>
            <SugarPanel
              tech={tech}
              onClick={placeOrder}
              lines={lines}
              setTech={setTech}
              setProgress={setProgress}
              setReady={setReady}
              setCurrentPrice={setCurrentPrice}
              setLoading={setLoading}
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
            setCurrentPrice={setCurrentPrice}
            setLoading={setLoading}
            tech={tech}
          />
          {tech && (
            <TechKeyboard
              onClick={placeOrder}
              getCurrentPrice={getCurrentPrice}
            />
          )}
          <CoffeeGrid
            coffeeList={coffeeList}
            setCoffeeList={setCoffeeList}
            onClick={handleCoffeeSelection}
            tech={tech}
          />
        </>
      )}
    </Box>
  );
}

export default App;
