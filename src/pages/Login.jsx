import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function Login() {
  const [user, setUser] = useState({username: "", password: ""})
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (user.username === "demo" && user.password === "1234") {
      localStorage.setItem("user", JSON.stringify({username: user.username}))
      window.dispatchEvent(new Event("userUpdated"))
      toast.success("welcome back ✨")
      navigate("/")
    } else {
      toast.error("Invalid credentials")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <form onSubmit={submitHandler} className="space-y-3">
        <input type="text" placeholder="Username" className="w-full border rounded px-3 py-2" onChange={(e) => setUser({ ...user, username: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full border rounded px-3 py-2" onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button className="w-full py-2 bg-pastelPink rounded text-white hover:shadow-md transition-all">Login</button>
      </form>
    </div>
  )
}

export default Login