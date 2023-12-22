import "./App.css";
import { useEffect, useRef, useState } from "react";
import { load } from "./main.ts";
import { SplashTagEditor } from "./ui/SplashTagEditor.tsx";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    // fill white canvas
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setTimeout(() => {
      if (!canvasRef.current) return;
      load(canvasRef.current);
    }, 500);
  }, [canvasRef.current, loading]);

  return (
    <>
      <div
        className={
          "flex h-screen w-screen items-center justify-center bg-black/80 sm:p-8"
        }
      >
        <div className={"h-full max-h-[648px] w-full max-w-[1152px] sm:p-8"}>
          <SplashTagEditor />
        </div>
      </div>
    </>
  );
}

export default App;
