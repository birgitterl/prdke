import "./App.css";
import "./components/layout/Navbar";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to moody - this is the landing page.</p>
        <Navbar />
      </header>
    </div>
  );
}

export default App;
