import "./App.css";
import { useEffect, useState } from "react";
import { access_token, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(access_token);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
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

            {profile && (
              <>
                <h1>{profile.display_name}</h1>
                <p>{profile.followers.total} Followers</p>
                {profile.images.length && profile.images.length > 0 && profile.images[0].url && (
                  <img src={profile.images[0].url} alt="Avatar" />
                )}
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
