import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import "./App.css";

// @MUI
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// LOCAL COMPONENTS

// BASE URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  // HANDLER FUNCTIONS
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const handleVerifyUser = async () => {
    const response = await fetch(`${BASE_URL}/verify_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data) {
      navigate("/diary");
    }
  };

  // RETURN
  return (
    <Box
      maxWidth={"100vw"}
      height={"100lvh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      sx={{
        backgroundImage: "url('src/assets/unicorn.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="xs">
        <Form method="post">
          <Paper
            sx={{
              p: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h3">Welcome to Unicorn land</Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button variant="contained" onClick={handleVerifyUser}>
              Login
            </Button>
          </Paper>
        </Form>
      </Container>
    </Box>
  );
}

export default Login;
