import React, { useState } from "react";

// @MUI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// LOCAL COMPONENTS
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import { Divider } from "@mui/material";

const DISPLAY_USER_DASHBOARD = 'user dashboard';
const DISPLAY_DASHBOARD = 'dashboard';

function App() {
  const [dashboardDisplaySetting, setDashboardDisplaySetting] = useState(DISPLAY_DASHBOARD);

  const handleDashboardRender = () => {
    if (dashboardDisplaySetting === DISPLAY_DASHBOARD) return <Dashboard />;
    else return <UserDashboard/>
  };
  // RETURN
  return (
    <>
      {/* HEADER */}
      <Header firstMenuItemOnClick = {() => setDashboardDisplaySetting(DISPLAY_USER_DASHBOARD)}/>
      <Divider sx={{ margin: 1 }} />

      {handleDashboardRender()}

    </>
  );
}

export default App;
