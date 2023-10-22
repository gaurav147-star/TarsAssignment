import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ICard from "../components/ICard";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import HTags from "../components/HTags";
import Nav from "../components/Nav";

const Result = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={{ background: isDarkMode ? "#232323" : "inherit" }}>
      {isSmallScreen ? <Nav /> : <Navbar />}
      <HTags/>
      <ICard />
    </Box>
  );
};

export default Result;
