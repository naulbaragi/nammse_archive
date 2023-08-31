/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/react';
import MainComponent from './MainComponent';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { nammseAPI_url } from '../../Url';

const mainComponent = css`
background-color: rgba(255, 255, 255, 0.06);
`;
function ImageComponent() {

  const [epdata, setepData] = useState(1);
  const [fulldata, setfullData] = useState([]);
  const [epdatapage, setepdatapage] = useState([1]);
  const [page, setPage] = useState(0);
  const [checkarr, setcheckarr] = useState([1]);

  const nammseAPI = async () => {
    const config = {
      method: 'get',
      url: nammseAPI_url
    };

    await axios(config)
      .then((response) => {
        setepData(response.data[0].Episode);
        setepdatapage([response.data[0].Episode, response.data[0].Episode - 1, response.data[0].Episode - 2]);
        setfullData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    nammseAPI();
  }, []);

  const Infinitytarget: any = useRef();
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          makingmain(observer);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }
  );

  useEffect(() => {
    if (Infinitytarget.current) {
      observer.observe(Infinitytarget.current);
    }
    return () => {
      if (Infinitytarget.current) {
        observer.unobserve(Infinitytarget.current);
      }
    };
  }, [observer, Infinitytarget]);

  useEffect(() => {
    const newCheckarr: number[] = [];
    fulldata.forEach((value, index) => {
      if (index % 9 === 0) {
        newCheckarr.push(value['Episode']);
      }
    });
    setcheckarr(newCheckarr);
  }, [fulldata]);


  const makingmain = (observer: any) => {
    const addele = epdata - 3 - page;
    if (addele > 0 && checkarr.includes(addele)) {
      setepdatapage([...epdatapage, addele]);
      setPage(page + 1);
      observer.disconnect();
    }
    else if (addele > 0 && !checkarr.includes(addele)) {
      setPage(page + 1);
    }
  };

  return (
    <div css={css`${mainComponent};`}>
      {epdatapage.map((value, index) => {
        return (<MainComponent key={'Main' + index} episode={value} fulldata={fulldata} />
        );
      }
      )}
      <div ref={Infinitytarget} style={{ width: '100%', height: 30 }} />
    </div>
  );
}

export default ImageComponent;