import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Login from "pages/Login";
import ProjectList from "pages/ProjectList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
