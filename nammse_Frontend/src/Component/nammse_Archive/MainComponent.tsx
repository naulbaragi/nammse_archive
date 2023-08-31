/** @jsxImportSource @emotion/react */
import './MainComponent.css';
import React from 'react';
import { css } from '@emotion/react';
import { nammseArtApi_url } from '../../Url';

interface MainComponentProps {
  episode: number;
  fulldata: {
    Episode: number;
    Track: number;
    Singer: string;
    Song: string;
    Link: string;
    Songlink: string;
  }[];
}

const albumArt = css`
margin-top: 50%;
`;

function MainComponent(props: MainComponentProps) {
  const { episode, fulldata } = props;
  let link = '';

  return (
    //map으로 비효율적으로 처리하는 부분을 수정예정
    <div className='mainComponent' key={'main' + episode} style={{ backgroundImage: 'url("/Image/Untitled.png")' }}>
      &nbsp;
      <h1 className='epi' key={'ep' + episode} style={{ fontFamily: 'Oswald', color: '#bfff58' }}>
        Earlsome Mix Playlist_{episode}
      </h1>
      <div className='albumArt' css={css`${albumArt};`} key={'al' + episode} style={{ marginBottom: '2%', marginTop: '2%' }}>
        <img src={nammseArtApi_url + `${episode}`} style={{ width: '50vmin' }} />
      </div>

      {fulldata.map((value, index) => {
        if (value['Episode'] == episode && value['Track'] > 0) {
          link = value['Link'];
          return (
            <h3 className='maintext' key={`main${episode}${index}`} style={{ fontFamily: 'Oswald', color: '#bfff58' }}>
              <a href={value['Songlink']} style={{ color: 'greenyellow', textDecoration: 'none' }}>
                {value['Track']}
                .&nbsp;
                {value['Singer']}
                &nbsp;-&nbsp;
                {value['Song']}
              </a>
            </h3>
          );
        }
      })}

      &nbsp;
      <div className='linkpage'>
        <a href={link} className='linkdata' style={{ fontFamily: 'Oswald', color: '#bfff58' }}>[NAMMSE] Earlsome Mix Playlist_{episode}</a>
      </div>
      &nbsp;
      <div className='margin'>
        <p>
          &nbsp;
        </p>
      </div>
    </div>
  );
}

export default MainComponent;