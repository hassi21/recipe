import { motion } from "framer-motion";
import React from "react";
import Popular from "../Popular/Popular";
import Veggie from "../Veggie/Veggie";
import "./Home.css"


function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opactiy: 0 }}
      transition={{ duration: 0.5 }}
      className="Home"
    >
      <Veggie />
      <Popular />
    </motion.div>
  );
}

export default Home;
// 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 --githubToken
