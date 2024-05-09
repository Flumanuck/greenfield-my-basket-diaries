import MenuSimple from "./Menu";
import "./Header.css";
import { Typography, Button, ButtonBase } from "@mui/material";

const Header = ( props ) => {
  const { homeButtonOnClick, firstMenuItemOnClick } = props;

  return (
    <div className="header">
      <ButtonBase variant="outlined" sx={ {transform: "translate(2em)"} } onClick={homeButtonOnClick}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/diaryEntries%2Flogo.png?alt=media&token=6c66aa6e-588a-4ca5-a826-fa6c001a15ec"
          style={{transform: "translate(0.5em) scale(1.5)"}}
        />
      </ButtonBase>
      <MenuSimple firstMenuItemOnClick = {firstMenuItemOnClick} className="MenuSimple" />
    </div>
  );
};

export default Header;
