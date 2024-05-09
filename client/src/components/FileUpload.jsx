import React, { useState, useEffect } from "react";
import UploadButton from "./UploadButton";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const username = localStorage.getItem("userId");
const userID = Number(username);

// FIREBASE
import "./FileUpload.css";
import { storage } from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// @MUI
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Button from "@mui/material/Button";

//built in firebase functions.
//ref: create reference to the folder path on the cloud storage
//uploadBytes: uploads the photo, takes care of file type etc. magic.
//listAll: list all items (objects) in the path folder specified
//getDownloadURL: get the actual url that can be added to img src to display the image

export default function FileUpload({ setIsNewEntry, handleClose }) {
  // USE STATE
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  // FILE UPLOAD STATE
  const [fileUpload, setFileUpload] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // USE EFFECT
  // preview image
  useEffect(() => {
    if (!fileUpload) {
      setPreviewImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(fileUpload);
    setPreviewImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [fileUpload]);

  useEffect(() => {
    if (imageURL) {
      handleUploadToDatabase();
    }
  }, [imageURL]);

  useEffect(() => {
    console.log("title", title);
  }, [title]);

  // HANDLER FUCNTION
  const storage = getStorage();

  const handleUploadToDatabase = async () => {
    await uploadToDatabase();
    setIsNewEntry((prev) => prev + 1);
    handleClose();
  };

  // upload file to Firebase
  const uploadFile = async () => {
    if (!fileUpload) return;
    const diaryEntriesFolderRef = ref(
      storage,
      `diaryEntries/${fileUpload.name}`
    );
    try {
      const snapshot = await uploadBytes(diaryEntriesFolderRef, fileUpload);
      const firebaseURL = await getDownloadURL(snapshot.ref);
      setImageURL(firebaseURL);
    } catch (err) {
      console.error("image upload error!", err);
    }
  };

  // upload to Database
  const uploadToDatabase = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${BASE_URL}/diaries`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userID: userID,
        foodTitle: title,
        foodDescription: description,
        imageURL: imageURL,
      }),
    });
  };

  // RETURN
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        New Diary
      </Typography>

      {/* PREVIEW IMAGE */}
      {fileUpload ? (
        <img src={previewImage} className="preview" />
      ) : (
        <DinnerDiningIcon sx={{ width: 400, height: 300 }} color="disabled" />
      )}

      {/* TEXT INPUT */}
      <TextField
        id="title"
        label="title"
        required
        variant="outlined"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        sx={{ width: "100%", mb: 1 }}
      />
      <TextField
        id="description"
        label="description"
        variant="outlined"
        className="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* UPLOAD BUTTON */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <UploadButton setFileUpload={setFileUpload} sx={{ margin: "4px" }} />
        <Button
          variant="outlined"
          component="label"
          role={undefined}
          tabIndex={-1}
          onClick={async () => {
            if (!title) {
              alert("please insert title");
            } else {
              console.log("uploading...");
              await uploadFile();
            }
          }}
        >
          Create Diary
        </Button>
        {/* {imageList.map((url) => {
          return <img src={url} />;
        })} */}
      </Box>
    </Box>
  );
}
