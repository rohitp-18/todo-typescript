import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Todo from "../components/todo";

function Home() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Sidebar />
        <Todo varient={"todo"} heading="To Do" bgcolor="#5858ff" />
        <Todo varient={"onProgress"} heading="On Progress" bgcolor="#ff9161" />
        <Todo varient={"completed"} heading="Completed" bgcolor="#25a723" />
      </main>
    </div>
  );
}

export default Home;
