import React, { FC } from "react";
import icons from "../../assets/icons/icons";
import "./styles.scss";
import Canvas from "../Canvas/Canvas";

const ChamberContainer: FC = () => {
  return (
    <div className="ChamberContainer">
      <h1>
        Палата торговли, промышленности, сельского хозяйства, горнодобывающей
        промышленности и ремесел <b>Чада в России</b>
      </h1>
      <object type="image/svg+xml" data={icons.cardWord}></object>
      {/* <Canvas /> */}
    </div>
  );
};

export default ChamberContainer;
