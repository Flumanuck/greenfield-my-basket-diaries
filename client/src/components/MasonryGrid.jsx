import React, { useState, useEffect } from "react";

import DiaryCard from "./DiaryCard";

// @MUI
import Masonry from "@mui/lab/Masonry";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DateConversion from "../utils/DateConversion";
import { Box, Button, Modal, TextField, createTheme, ThemeProvider } from "@mui/material";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const username = localStorage.getItem("userInitials") ? localStorage.getItem("userInitials").toUpperCase() : ""

export default function MasonryGrid({
  entries,
  handleDeleteDiary,
  handleReadData,
  setIsEdit,
  setEditId,
  setEditUserId
}) {

  // RETURN
  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 4 }}
      spacing={2}
      style={{ width: "100%" }}
    >
        {entries.map((entry, index) => (
          <DiaryCard
            key={index}
            entry={entry}
            handleDeleteDiary={handleDeleteDiary}
            handleReadData={handleReadData}
            setIsEdit={setIsEdit}
            setEditId={setEditId}
            setEditUserId={setEditUserId}
          />
        ))}

    </Masonry>
  )
};
