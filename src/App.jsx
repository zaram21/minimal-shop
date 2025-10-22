import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Router from "./Router"


function App() {
  return (
    <>
      <Navbar />
      <Router />
      <Toaster position="bottom-right" />
    </>
  )
}

export default App