import "./App.css";
import { useEffect, useState } from "react";
import { access_token, logout } from "./spotify";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(access_token);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Log in to spotify
          </a>
        ) : (
          <>
            <h1>Logged In!!!!</h1>
            <button onClick={logout}>Log Out</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
