import NavBar from "./NavBar/NavBar";

import "./Header.scss";
import { RiBookShelfLine } from "react-icons/ri";
// import MainMenu from "../MainMenu/MainMenu";

export default function Header() {
  return (
    <header>
      <div className="header-title-container">
        <RiBookShelfLine />
        <h1 className="header-title">Book Club</h1>
      </div>
      <NavBar />
    </header>
  );
}
