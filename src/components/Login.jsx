import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Trạng thái để chuyển đổi giữa đăng nhập và đăng ký

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Đăng ký
        await createUserWithEmailAndPassword(auth, email, password);
        setError(null);
        alert("Đăng ký thành công!");
      } else {
        // Đăng nhập
        await signInWithEmailAndPassword(auth, email, password);
        setError(null);
        alert("Đăng nhập thành công!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setError(null);
      alert("Đăng nhập bằng Google thành công!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignUp ? "Đăng ký" : "Đăng nhập"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Nhập email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {isSignUp ? "Đăng ký" : "Đăng nhập"}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="w-full mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
      >
        Đăng nhập bằng Google
      </button>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full mt-2 text-blue-500 underline hover:text-blue-700"
      >
        {isSignUp ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
      </button>
    </div>
  );
};

export default Login;