import React, { useState, useEffect } from "react";
const username = localStorage.getItem("userId");

// @MUI
import MasonryGrid from "./MasonryGrid";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Firebase
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from "../config/firebase";


export default function PaginationTable({ isNewEntry }) {
  // USE STATE
  const [entries, setEntries] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [editTitle, setEditTitle] = useState(null);
  const [editDescription, setEditDescription] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

  // USE EFFECT
  useEffect(() => {
    handleReadData(); // AUTO RELOAD DATA
  }, [isNewEntry]);

  // HANDLERS FUNCTION
  const storage = getStorage();

  const handleReadData = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${BASE_URL}/diaries/`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const initialData = await userInitialsRes.json();
    data.map((entry, index) => {
      entry["initials"] = initialData[index].initials
    })
    const sortedDataDesc = data.sort((a, b) => {
      return b.diary_id - a.diary_id;
    });

    setEntries([...sortedDataDesc]);
  };

  const handleDeleteDiary = async (diaryID, editUserId, image_url) => {
    console.log(`${editUserId}`, username, `${image_url}`);
    if (`${editUserId}` === username) {
      const token = localStorage.getItem("jwtToken");
      try{ 
        await fetch(`${BASE_URL}/diaries/${diaryID}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const imgRef = ref(storage, `${image_url}`);
        deleteObject(imgRef).then(() => {
         console.log("File deleted successfully");
       }).catch((error) => {
          console.error("Uh-oh, an error occurred!");
        });
      } catch (err) {
        console.error(err);
      }
      handleReadData();
    } else {
      alert("you shall not delete someone else's diary");
    }
  };

  const handleClose = () => setIsEdit(false);

  const handleEditDiary = async (diaryID, editUserId) => {
    console.log(`${editUserId}`, username);
    if (`${editUserId}` === username) {
      const token = localStorage.getItem("jwtToken");

      await fetch(`${BASE_URL}/diaries/${diaryID}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodTitle: editTitle,
          foodDescription: editDescription,
        }),
      });
      setEditTitle(null);
      setEditDescription(null);
      setEditId(null);
      handleReadData();
    } else {
      alert("you shall not edit");
    }
  };

  // RETURN
  return (
    <>
      {/* MASONRY */}
      <MasonryGrid
        entries={entries}
        handleDeleteDiary={handleDeleteDiary}
        handleReadData={handleReadData}
        setIsEdit={setIsEdit}
        setEditId={setEditId}
        setEditUserId={setEditUserId}
      />

      {/* MODAL */}
      {isEdit && (
        <Modal open={isEdit} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mb={2}
              color={"primary.main"}
            >
              Edit
            </Typography>
            <TextField
              label="title"
              sx={{ width: "100%", mb: 2 }}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
            <TextField
              label="description"
              sx={{ width: "100%", mb: 2 }}
              onChange={(e) => {
                setEditDescription(e.target.value);
              }}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "60%" }}
                onClick={() => {
                  handleEditDiary(editId, editUserId);
                  setIsEdit(false);
                }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ width: "30%" }}
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}
