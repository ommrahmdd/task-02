import React, { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Footer from "./components/footer/Footer";
import Loading from "./components/Loading";
import Nav from "./components/nav/Nav";

let Home = lazy(() => import("./pages/home/Home"));
let MovieDetails = lazy(() => import("./pages/movieDetails/MovieDetails"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/movie/:movieID" element={<MovieDetails />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
