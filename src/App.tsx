import { useEffect, useState } from "react";
import { SplashTagEditor } from "./ui/SplashTagEditor.tsx";
import { loadFonts } from "./lib/render-plate.ts";
import { base } from "./lib/const.ts";

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
    <div
      style={{
        backgroundImage: `url(${base}/backgrounds/main-background.png)`,
      }}
      className={"bg-gray-900 bg-opacity-90 bg-contain bg-repeat"}
    >
      <div
        className={
          "flex h-screen w-screen items-center justify-center overflow-auto bg-white/10 sm:p-8"
        }
      >
        <div
          className={
            "h-full w-full max-w-4xl rounded-md bg-black/50 bg-opacity-50 sm:max-h-full sm:p-8 md:max-h-[760px]"
          }
        >
          <SplashTagEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
