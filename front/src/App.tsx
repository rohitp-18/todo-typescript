import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Todo from "./components/todo";
import OnProcess from "./components/onProcess";
import Done from "./components/done";
import Sidebar from "./components/sidebar";
import { AlertProvider } from "./components/alertProvider";

function App() {
  return (
    <AlertProvider>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main>
          <Sidebar />
          <Todo />
          <OnProcess />
          <Done />
        </main>
      </div>
    </AlertProvider>
  );
}

export default App;
