import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main"
import Movies from "../Movies/Movies"
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </div>
  )
}

export default App;
