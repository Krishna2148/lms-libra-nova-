import { useEffect } from "react";
import Signinform from "./pages/Sign-in"

function App() {

  useEffect(() => {
    // Force tablet-scale rendering
    const scale = window.innerWidth / 768;
    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin = 'top center';
    window.addEventListener("resize", () => {
      const scale = window.innerWidth / 768;
      document.body.style.transform = `scale(${scale})`;
    });
  }, []);
  return (
    <>
      <Signinform />
    </>
  )
}

export default App
