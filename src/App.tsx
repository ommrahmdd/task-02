import React, { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";

let Home = lazy(() => import("./pages/home/Home"));
function App() {
  // API: https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
