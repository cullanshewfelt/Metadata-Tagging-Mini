import React from "react";
import { css } from "@emotion/core"; // eslint-disable-line no-unused-vars
import { BeatLoader } from "react-spinners";

export const Loader = () => (
  <div>
    <BeatLoader
      sizeUnit={"px"}
      size={15}
      color={"red"}
    />
  </div>
);

module.exports = { Loader }; 
