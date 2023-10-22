import React, { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Chip, ListItem, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const ImageModal = forwardRef((props, ref) => {
  const { item } = props;

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <>
      <Card
        className="card_modal"
        sx={{
          mx: "auto",
          borderRadius: "20px",
          background: isDarkMode ? "black" : "white",
        }}
      >
        <CardMedia
          className="modal_image"
          component="img"
          image={item.urls?.regular}
          alt={item.alt_description}
        />
        <Box
          sx={{
            display: "flex",
            py: "10px",
            justifyContent: "space-between",
            px: "20px",
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar
              alt={`${item.user?.username}`}
              src={item.user?.profile_image?.medium}
            />
            <div style={{ marginLeft: "10px" }}>
              <Typography
                sx={{
                  color: isDarkMode ? "#E5E5E5" : "#4F4F4F",
                  fontWeight: "600",
                }}
              >
                {item.user?.first_name} {item.user?.last_name}
              </Typography>
              <Typography
                variant="body"
                sx={{ color: "#A7A7A7", fontStyle: "italic" }}
              >
                @{item.user?.username}
              </Typography>
            </div>
            <InstagramIcon
              sx={{
                color: "#A7A7A7",
                fontStyle: "italic",
                marginLeft: "20px",
                width: "20px",
              }}
            />
            <Typography
              variant="body"
              sx={{ color: "#A7A7A7", fontStyle: "italic" }}
            >
              /@{item.user?.instagram_username}
            </Typography>
            <TwitterIcon
              sx={{
                color: "#A7A7A7",
                fontStyle: "italic",
                marginLeft: "20px",
                width: "20px",
              }}
            />
            <Typography
              variant="body"
              sx={{ color: "#A7A7A7", fontStyle: "italic" }}
            >
              /@{item.user?.twitter_username}
            </Typography>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", color: "#858484" }}
          >
            <div style={{ display: "flex" }}>
              <Typography mr={0.5} sx={{ fontWeight: "700" }}>
                {item.downloads}
              </Typography>
              <Typography
                mr={2}
                sx={{ fontWeight: "700", fontFamily: "Montserrat" }}
              >
                downloads
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <ThumbUpOffAltIcon />
              <Typography ml={0.5} sx={{ fontWeight: "700" }}>
                {item.likes}
              </Typography>
            </div>
          </div>
        </Box>

        <Box
          sx={{
            py: "10px",
            px: "20px",
          }}
        >
          <Typography
            mb={2}
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "700",
              color: isDarkMode ? "#E5E5E5" : "#4F4F4F",
            }}
          >
            Related Tags
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            {item &&
              item.tags &&
              item.tags?.map((it) => (
                <Chip
                  key={it?.title}
                  style={{ color: "#4F4F4F", backgroundColor: "#ECECEC" }}
                  label={it?.title}
                />
              ))}
          </Stack>
        </Box>
      </Card>
    </>
  );
});

export default ImageModal;
