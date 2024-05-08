import MenuSimple from "./Menu";
import "./Header.css";
import { Typography } from "@mui/material";

const Header = ( props ) => {
  const { firstMenuItemOnClick } = props;

  return (
    <div className="header">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/diaryEntries%2Flogo.png?alt=media&token=6c66aa6e-588a-4ca5-a826-fa6c001a15ec"

        style={{ transform: "scale(1.5) translate(30px)" }}
      />
      <MenuSimple firstMenuItemOnClick = {firstMenuItemOnClick} className="MenuSimple" />
    </div>
  );
};

export default Header;
