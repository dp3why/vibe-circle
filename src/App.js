import { useState } from "react";
import TopBar from "./components/topbar/TopBar";
import { TOKEN_KEY } from "./constants";
import Main from "./components/main/Main";
import { Layout } from "antd";

const { Footer } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false
  );
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };
  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
      <Footer
        style={{
          padding: "4em",
          marginTop: "4em",
          textAlign: "center",
          bottom: 0,
          width: "100%",
          height: "50px",
        }}
      >
        <h3>VibeCircle@2024 By dp3why</h3>
      </Footer>
    </div>
  );
}

export default App;
