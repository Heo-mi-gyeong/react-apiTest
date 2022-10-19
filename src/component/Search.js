import React, { useEffect, useRef, useState } from 'react'
import Button from './button/Button.js';
import styles from '../styles/search.module.css';
import MovieList from './MovieList' 
import axios from 'axios';

const Search = () => {
  //api 
  // 요청 url : https://openapi.naver.com/v1/search/movie.json
  // Client id : LXTIWfkqGGa7zfKNIkk1(X-Naver-Client-Id)
  // Client Secret : EDRJAsd_jO(X-Naver-Client-Secret)
  // Content-Type: application/json

  const [data,setData] = useState([]);

  const onSearch = (e,targetInput) => {
    e.preventDefault();
    axios({
      method: 'get',
      url: 'https://openapi.naver.com/v1/search/movie.json',
      params: {
        display : '10',
        query : targetInput
      },
      headers : {
        'X-Naver-Client-Id' : 'LXTIWfkqGGa7zfKNIkk1',
        'X-Naver-Client-Secret' : 'EDRJAsd_jO',
        'Content-Type' : 'plain/text',
      }
    }).then((response) => {
      setData(response.data.items);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    console.log(data);
  },[data]);

const searchInput = useRef(); 
  return (
    <div className={styles.container}>
        <form className={styles.sContainer}>
            <input className={styles.input} type={'text'} placeholder='검색할 영화를 입력하세요.' ref={searchInput}/>
            <Button text={'검색'} bkcolor={'salmon'} ftcolor={'ivory'} onClick={(e) => {onSearch(e,searchInput.current.value)}}/>
        </form>
         {
            data&&data.length>0
            ?data.map((data, index) => {
                return (
                    <MovieList key={index} movie={data}/>
                )
            })
            :(
                <div className={styles.sContainer}>
                    <h3 style={{color : '#aaaaaa'}}>조회 결과가 없습니다.</h3>
                </div>
            )
        }
    </div>
  )
}

export default Search