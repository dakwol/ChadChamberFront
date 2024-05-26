import React, { FC } from "react";
import icons from "../../assets/icons/icons";
import Buttons from "../Buttons/Buttons";
import "./styles.scss";

const Header: FC = () => {
  const dataNav = [
    {
      id: 1,
      name: "Главная",
      link: "#main",
    },
    {
      id: 2,
      name: "о нас",
      link: "#about",
    },
    {
      id: 3,
      name: "мероприятия",
      link: "#events",
    },
    {
      id: 4,
      name: "услуги",
      link: "#services",
    },
    {
      id: 5,
      name: "партнерство",
      link: "#partnership",
    },
    {
      id: 6,
      name: "Контакты",
      link: "#contacts",
    },
  ];

  return (
    <header className="header">
      <div className="containerHeader">
        <img src={icons.Logo} alt="Logo" />
        <nav className="nav">
          {dataNav.map((item) => (
            <a href={item.link} key={item.id}>
              {item.name}
            </a>
          ))}
        </nav>
        <a href="tel:+79999999999">+7 (999) 999-99-99</a>
      </div>
    </header>
  );
};

export default Header;
