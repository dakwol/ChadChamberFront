import React, { FC } from "react";
import "./styles.scss";
import icons from "../../assets/icons/icons";
import { RouteNames, navDate } from "../../routes";
import { Link, useNavigate } from "react-router-dom";

const Footer: FC = () => {
  const navigation = useNavigate();

  return (
    <div>
      <footer className="footer">
        <div className="footerLogo">
          <img src={icons.Logo}></img>
          <h5>
            Палата торговли, промышленности, сельского хозяйства,
            горнодобывающей промышленности и ремесел <b>Чада в России</b>
          </h5>
        </div>
        <div></div>
        <div className="containerFlexColumn">
          <a href="tel:+7 (999) 999-99-99">+7 (999) 999-99-99</a>
          <a>Страна, город, улица, дом</a>
          <a href="mailto:meow@mail.ru">meow@mail.ru</a>
        </div>
        <div className="containerFlexColumn">
          <a>@Запрещенная соцсеть</a>
          <a>@вк</a>
        </div>
      </footer>
      <p className="footerInfoText">
        © Палата торговли, промышленности, сельского хозяйства, горнодобывающей
        промышленности и ремесел Чада в России, 2024
        <br />
        Все права защищены. Воспроизведение материалов данного сайта без
        разрешения правообладателя запрещено.
      </p>
    </div>
  );
};

export default Footer;
