import React from 'react';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';

export default () => {
  return (
    <div>
      <BeatLoader
        sizeUnit={"px"}
        size={15}
        color={'red'}
      />
  </div>
)}
