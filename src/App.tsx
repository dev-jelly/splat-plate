import {useEffect} from "react";


const redirectUrl = "https://plate.octol.ing";

function App() {

  useEffect(() => {
    location.href = redirectUrl + location.hash;

  }, []);


  return (
    <div
      className={
        "flex h-screen w-screen items-center justify-center bg-black/50 text-white"
      }
    >
      <div>Redirect...</div>
    </div>
  );


}

export default App;
