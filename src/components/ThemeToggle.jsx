import { MdSunny } from "react-icons/md";
import { PiMoonStarsFill } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="d-flex align-items-center">
      <button
        onClick={toggleTheme}
        className="btn btn-outline-light btn-md d-flex align-items-center"
        title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? (
          <>
            <i className=" "></i>
            <MdSunny />
          </>
        ) : (
          <>
            <i className="bi bi-moon- "></i>
            <PiMoonStarsFill />
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
