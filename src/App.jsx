import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      {user ? (
        <div>
          <p>Xin chào, {user.displayName || user.email}!</p>
          <button
            onClick={() => auth.signOut()}
            className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Đăng xuất
          </button>
          <TodoList />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
