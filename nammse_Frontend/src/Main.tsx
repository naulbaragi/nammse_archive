/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import Nammsebase from './Component/nammse_Archive/Nammsebase';
import Discography from './Component/nammse_Archive/Discography';

const header = css`
width: 100vw;
font-size: 3vmin;
align-items: center;
`;

const background = css`
display: grid;
grid-template-columns: 1fr 3fr 1fr;
justify-items: center;
align-items: center;
// width: 100vmin;
height: 10vmin;
background-image: url("/Image/Header.jpg");
background-position: center;
// background-size: cover;
`;

const logo = css`
width: 20vmin;
`;

const discographybutton = css`
font-family: 'Oswald';
color: #bfff58;
text-decoration: none;
`;

function Main() {

  const location = useLocation();
  const [mainbutton, setmainbutton] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      setmainbutton('DISCOGRAPHY');
    }
    else {
      setmainbutton('MAIN');
    }
  }, []);

  const buttonchange = function (state: string) {
    if (state === 'DISCOGRAPHY') {
      return (
        <div>
          <Link to='/life/nammseArchive/songs' css={css`${discographybutton};`} onClick={() => { setmainbutton('MAIN'); }}>{mainbutton}</Link>
        </div>
      );
    }
    else {
      return (
        <div>
          <Link to='/' css={css`${discographybutton};`} onClick={() => { setmainbutton('DISCOGRAPHY'); }}>{mainbutton}</Link>
        </div>
      );
    }
  };

  return (
    <div className="Main">
      <header className='Nammse-header' css={css`${header};`}>
        <div className='Background' css={css`${background};`}>
          <a href='https://www.youtube.com/@NAMMSE' css={css`${discographybutton};`}>YOUTUBE</a>
          <img src='/Image/MainLogo.png' css={css`${logo};`}></img>
          {buttonchange(mainbutton)}
        </div>
      </header >
      <Routes>
        <Route path='/' element={Nammsebase()} />
        {/* <Route path='/life/nammseArchive/songs' element={<Discography></Discography>} />  */}
        <Route path='/life/nammseArchive/songs' element={Discography()} />
      </Routes>
    </div >
  );
}

export default Main;
