import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { searchPhotos } from "../actions/photoActions";
import ClearIcon from "@mui/icons-material/Clear";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toggleOpenList } from "../actions/openListAction";
import { searchQuery } from "../actions/searchQueryAction";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  zIndex: "1",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    backgroundColor: "#ECECEC",
    borderRadius: "6px",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "45ch",
      },
    },
  },
}));

const SearchField = () => {
  const dispatch = useDispatch();
  const photoList = useSelector((state) => state.photos);
  const query = useSelector((state) => state.search_query.query_value);

  const { loading, error, photos } = photoList;

  const handleSearch = (query) => {
    dispatch(searchPhotos(query));
    dispatch(toggleOpenList(false));
    dispatch(searchQuery(query));
    // setquery(query);
  };

  const isOpenList = useSelector((state) => state.openList.isOpenList);

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior
      dispatch(toggleOpenList(true));
      navigate("/result");
    }
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    dispatch(toggleOpenList(true));
    navigate("/result");
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(searchQuery(""));
    navigate("/");
  };

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
    <>
      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={query ? query : "Search…"}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <ClearIcon
              sx={{ color: isDarkMode ? "#E5E5E5" : "#4F4F4F" }}
              onClick={handleClose}
            />
          )}
        </Search>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching photos</p>}
      {photos && photos.length > 0 && (
        <List
          style={{
            position: "absolute",
            top: "80px",
            marginLeft: "2px",
            background: "white",
            borderRadius: "10px",
            zIndex: "100",
            display: isOpenList ? "none" : "initial",
            "@media (max-width: 800px)": {
              position: "relative", // Change position to absolute for screens less than 800px wide
              top: "8px",
            },
          }}
        >
          {photos.slice(0, 4).map((result) => (
            <ListItem key={result.id} onClick={handleClick}>
              <ListItemAvatar>
                <Avatar src={result.urls.small} alt={result.alt_description} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  result.slug
                    ? result.slug.split("-").slice(0, 4).join(" ")
                    : result.alt_description.split(" ").slice(0, 7).join(" ")
                }
                // primary={result.breadcrumbs[1]}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default SearchField;
