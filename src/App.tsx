import "./App.css";
import { useEffect, useState } from "react";
import { SplashTagEditor } from "./ui/SplashTagEditor.tsx";
import { loadFonts } from "./lib/render-plate.ts";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const interval = setInterval(async () => {
      console.log("loading fonts");
      setLoaded(await loadFonts());
    }, 500);

    return () => clearInterval(interval);
  }, [loaded]);

  if (!loaded)
    return (
      <div
        className={
          "flex h-screen w-screen items-center justify-center bg-black/50 text-white"
        }
      >
        <div>Loading...</div>
      </div>
    );

  return (
    <>
      <div
        className={
          "flex h-screen w-screen items-center justify-center overflow-auto bg-black/80 sm:p-8"
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
