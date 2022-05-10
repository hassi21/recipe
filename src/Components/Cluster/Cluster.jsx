import React from "react";
import Home from "../Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Cuisines from "../Cuisines/Cuisines";
import Searched from "../Searched/searched";
import Recipe from "../Recipe/Recipe";
import { AnimatePresence } from "framer-motion";

function Cluster() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisines />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </AnimatePresence>
  );
}
export default Cluster;
