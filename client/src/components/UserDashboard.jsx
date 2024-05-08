import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import UserPaginationTable from "./UserPaginationTable";
import FileUpload from "./FileUpload";
import { useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Dashboard() {
  // USE STATE
  const [isNewEntry, setIsNewEntry] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // RETURN
  return (
    <Box
      padding={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "rgb(230, 144, 153)",
      }}
    >
      <Typography variant={'h2'}>User Dashboard</Typography>
      {/* FILE UPLOAD */}
      <Button
        variant="contained"
        sx={{
          alignSelf: "flex-end",
          mb: 2,
          backgroundColor: "rgb(224, 100, 146)",
        }}
        onClick={handleOpen}
      >
        New Diary
        <AddCircleIcon sx={{ ml: 1 }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ width: "50lvw" }}>
          <Paper sx={{ p: 2 }}>
            <FileUpload
              setIsNewEntry={setIsNewEntry}
              handleClose={handleClose}
            />
          </Paper>
        </Box>
      </Modal>

      {/* TABLE */}
      <UserPaginationTable isNewEntry={isNewEntry} />
    </Box>
  );
}
