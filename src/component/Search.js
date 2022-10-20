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
  const searchInput = useRef(); 
  const page = useRef(10);
  const [genre,setGenre] = useState('');

  const onSearch = (e,targetInput) => {
    e.preventDefault();

    if(!targetInput){
      alert('검색어를 한글자 이상 입력해주세요.');
      return;
    }

    page.current = 10;

    axios({
      method: 'get',
      url: 'https://openapi.naver.com/v1/search/movie.json',
      params: {
        display : '10',
        query : targetInput,
        display: 10
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
      //error 모달장으로 띄우기
    });
  }

  useEffect(() => {
    console.log(data);
  },[data]);

  const addPage = () => {
    page.current = page.current+10;

    axios({
      method: 'get',
      url: 'https://openapi.naver.com/v1/search/movie.json',
      params: {
        display : '10',
        query : searchInput.current.value,
        display: page.current
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
      //error 모달장으로 띄우기
    });
  }

  return (
    <div className={styles.container}>
        <form className={styles.sContainer}>
            <input className={styles.input} type={'text'} placeholder='검색할 영화를 입력하세요.' ref={searchInput}/>
            <Button text={'검색'} bkcolor={'#FF5733'} ftcolor={'ivory'} onClick={(e) => {onSearch(e,searchInput.current.value)}}/>
        </form>
        <div className={styles.sContainer}>
          <button className={genre==='1'?styles.clickButton:''} text={'드라마'} onClick={setGenre('1')}/>
          <button className={genre==='2'?styles.clickButton:''} text={'판타지'} onClick={setGenre('2')}/>
          <button className={genre==='4'?styles.clickButton:''} text={'공포'} onClick={setGenre('4')}/>
          <button className={genre==='5'?styles.clickButton:''} text={'로맨스'} onClick={setGenre('5')}/>
          <button className={genre==='7'?styles.clickButton:''} text={'스릴러'} onClick={setGenre('7')}/>
          <button className={genre==='8'?styles.clickButton:''} text={'느와르'} onClick={setGenre('8')}/>
          <button className={genre==='10'?styles.clickButton:''} text={'다큐멘터리'} onClick={setGenre('10')}/>
          <button className={genre==='11'?styles.clickButton:''} text={'코미디'} onClick={setGenre('11')}/>
          <button className={genre==='12'?styles.clickButton:''} text={'가족'} onClick={setGenre('12')}/>
          <button className={genre==='13'?styles.clickButton:''} text={'미스터리'} onClick={setGenre('13')}/>
          <button className={genre==='14'?styles.clickButton:''} text={'전쟁'} onClick={setGenre('14')}/>
          <button className={genre==='15'?styles.clickButton:''} text={'애니메이션'} onClick={setGenre('15')}/>
          <button className={genre==='16'?styles.clickButton:''} text={'범죄'} onClick={setGenre('16')}/>
          <button className={genre==='18'?styles.clickButton:''} text={'SF'} onClick={setGenre('18')}/>
        </div>
        <div className={styles.movieContainer}>
         {
            data&&data.length>0
            ?data.map((data, index) => {
                return (
                    <MovieList key={index} movie={data}/>
                )
            })
            :(
                <h3 style={{color : '#cccccc'}}>조회 결과가 없습니다.</h3>
            )
        }
        </div>
        {
            data&&data.length>0&&!(data.length%10<10&&data.length%10!==0)&&data.length<100
            ?(
              <Button text={'더보기 ▼'} onClick={addPage}/>
            )
            :(
              <p/>
            )
        }
    </div>
  )
}

export default Search