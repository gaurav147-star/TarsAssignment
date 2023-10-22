import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";
import ImageModal from "./ImageModal";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postsAction";
import searchPhotos from "../actions/photoActions";

export default function ICard() {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const postsList = useSelector((state) => state.posts);
  let { loading, error, posts } = postsList;

  const photoList = useSelector((state) => state.photos);
  let { photos } = photoList;
  const query = useSelector((state) => state.search_query.query_value);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  if (query) {
    posts = photos;
  }

  useEffect(() => {
    dispatch(listPosts());
    if (query) {
      dispatch(searchPhotos(query));
    }
  }, [dispatch]);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
      <ImageList className="image_list" variant="masonry">
        {posts?.map((item) => (
          <ImageListItem key={item.id}>
            <Card
              onClick={() => handleOpen(item)}
              sx={{
                mx: "auto",
                borderRadius: "10px",
                background: isDarkMode ? "black" : "inherit",
              }}
            >
              <CardMedia
                component="img"
                // height="194"
                image={item.urls?.regular}
                alt={item.alt_description}
                loading="lazy"
              />
              <Box
                sx={{
                  display: "flex",
                  p: "10px",
                  justifyContent: "space-between",
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
                </div>
                <IconButton
                  aria-label="add to favorites"
                  sx={{ display: "flex" }}
                >
                  <ThumbUpOffAltIcon
                    sx={{ color: isDarkMode ? "#E5E5E5" : "#4F4F4F" }}
                  />
                  <Typography
                    sx={{ color: isDarkMode ? "#E5E5E5" : "#4F4F4F" }}
                  >
                    {item.likes}
                  </Typography>
                </IconButton>
              </Box>
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          pt: "6%",
        }}
      >
        <ImageModal item={selectedItem} />
      </Modal>
    </Container>
  );
}
