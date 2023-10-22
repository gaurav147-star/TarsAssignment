import { Box, Chip, Container, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HTags = () => {
  const { photos } = useSelector((state) => state.photos);
  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    const container = containerRef.current;
    container.scrollLeft += scrollOffset;
  };

  const set = new Set(); // Create a new Set

  photos.forEach((photo) => {
    photo.tags.forEach((tag) => {
      set.add(tag.title); // Add title to the Set
    });
  });

  const uniqueArray = Array.from(set); // Convert Set back to Array

  return (
    <Container
    maxWidth="xl"
      sx={{
       
        display: "flex",
        gap: "30px",
        paddingLeft: "25px",
        paddingTop: "25px",
        overflow: "hidden",
      }}
      ref={containerRef}
    >
      {uniqueArray &&
        uniqueArray.map((item, index) => (
          <Box
            key={index}
            sx={{
              color: "#4F4F4F",
              border:'1px solid #C4C4C4',
              paddingX: "20px",
              borderRadius: "2px",
              height:'40px',
            }}
          >
            <Typography sx={{lineHeight:'2.3'}}>

            {item}
            </Typography >
          </Box>
        ))}
      <div
        onClick={() => handleScroll(-100)}
        style={{
          position: "absolute",
          // top:'380px',
          left: "120px",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      >
        <KeyboardArrowLeftIcon sx={{fontSize:'40px'}} />
      </div>
      <div
        onClick={() => handleScroll(100)}
        style={{
          position: "absolute",
          // top:'380px',
          right: "120px",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      >
        <KeyboardArrowRightIcon sx={{fontSize:'40px'}} />
      </div>
    </Container>
  );
};

export default HTags;
