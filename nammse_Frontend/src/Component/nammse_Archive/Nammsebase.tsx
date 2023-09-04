/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import ImageComponent from './ImageComponent';

const nammsebase = css`
text-align: center;
background: #bfff58;
`;

function Nammsebase() {
  return (
    <div className='Nammsebase' css={css`${nammsebase};`}>
      <ImageComponent></ImageComponent>
    </div>
  );
}

export default Nammsebase;
