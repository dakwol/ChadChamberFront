import React, { FC } from "react";
import icons from "../../assets/icons/icons";
import "./styles.scss";

const PartnershipContainer: FC = () => {
  const dataPartner = [
    {
      id: 1,
      img: icons.logos_yandex,
    },
    {
      id: 2,
      img: icons.logos_google,
    },
    {
      id: 3,
      img: icons.image29,
    },
    {
      id: 4,
      img: icons.image30,
    },
    {
      id: 5,
      img: icons.image31,
    },
  ];
  return (
    <div className="containerPathership">
      <h1 className="titlePathership">Партнерство</h1>

      <div className="imgContainer">
        {dataPartner.map((item) => {
          return <img src={item.img} key={item.id}></img>;
        })}
      </div>
    </div>
  );
};

export default PartnershipContainer;
