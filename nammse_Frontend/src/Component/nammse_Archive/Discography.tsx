/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { nammseAPI_url } from '../../Url';


const discography_module = css`
background-image: url("/Image/Untitled.png");
color: #bfff58;
display: grid;
grid-template-columns: 1min;
justify-items: center;
align-items: center;
`;



function Discography() {
  const [alldata, setalldata] = useState([]);
  useEffect(() => {
    alldatafront();
  }, []);
  const alldatafront = async () => {
    const config = {
      method: 'get',
      url: nammseAPI_url,
      headers: {}
    };
    await axios(config)
      .then((response) => {
        setalldata(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function sortTrack() {
    axios.get(nammseAPI_url)
      .then((response) => {
        setalldata(response.data.sort((a: any, b: any) => a['Track'] - b['Track']));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function sortEpisode() {
    axios.get(nammseAPI_url)
      .then((response) => {
        setalldata(response.data.sort((a: any, b: any) => b['Episode'] - a['Episode']));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function sortArtist() {
    axios.get(nammseAPI_url)
      .then((response) => {
        setalldata(response.data.sort((a: any, b: any) => a['Singer'].localeCompare(b['Singer'])));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function sortSong() {
    axios.get(nammseAPI_url)
      .then((response) => {
        setalldata(response.data.filter((a: any) => a['Song'] !== null).sort((a: any, b: any) => a['Song'].localeCompare(b['Song'])));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderlist() {

    return (
      <tbody>
        {
          alldata.map((a, i) => {
            if (a['Track'] !== 0) {
              return (
                <tr key={i}>
                  <td style={{ color: 'greenyellow' }}><a style={{ color: 'greenyellow' }} href={a['Link']}> {a['Episode']}</a></td>
                  <td>{a['Track']}</td>
                  <td>{a['Singer']}</td>
                  <td>{a['Song']}</td>
                  <td style={{ color: 'greenyellow' }}><a style={{ color: 'greenyellow' }} href={a['Songlink']}>Listen</a></td>
                </tr>

              );
            }
          })}
      </tbody>
    );
  }

  return (
    <div className='allsong'>
      <div className='discographydiv' css={css`${discography_module};`}>
        <table className='stringco' style={{ borderSpacing: '0.5vwmin', textAlign: 'center' }}>
          <thead>
            <tr style={{ fontSize: '3vmin', color: 'a2ff0c' }}>
              <th onClick={sortEpisode} style={{ cursor: 'pointer', padding: '1vwmin' }}>Episode</th>
              <th onClick={sortTrack} style={{ cursor: 'pointer', padding: '1vwmin' }}>Track</th>
              <th onClick={sortArtist} style={{ cursor: 'pointer', padding: '1vwmin' }}>Artist</th>
              <th onClick={sortSong} style={{ cursor: 'pointer', padding: '1vwmin' }}>Song</th>
              <th>Link</th>
            </tr>
          </thead>
          {renderlist()}
        </table>
      </div>
    </div >
  );
}
export default Discography;