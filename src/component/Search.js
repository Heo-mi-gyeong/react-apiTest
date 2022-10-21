import React, { useEffect, useRef, useState } from 'react'
import Button from './button/Button.js';
import styles from '../styles/search.module.css';
import MovieList from './MovieList' 
import axios from 'axios';

const Search = () => {

  const [data,setData] = useState([]);
  const searchInput = useRef(); 
  const page = useRef(10);
  const [genre,setGenre] = useState('');

  const onSearch = (e,targetInput) => {
    e.preventDefault();
    setGenre('');

    if(!targetInput){
      alert('검색어를 한글자 이상 입력해주세요.');
      return;
    }

    page.current = 10;

    axios({
      method: 'get',
      //url: 'https://openapi.naver.com/v1/search/movie.json',
      url: '/v1/search/movie.json',
      params: {
        display : '10',
        query : targetInput,
        display: page.current,
        genre : genre
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

  /* //조회한 영화목록 확인용
  useEffect(() => {
    console.log(data);
  },[data]); */

  const addPage = () => {
    page.current = page.current+10;

    axios({
      method: 'get',
      //url: 'https://openapi.naver.com/v1/search/movie.json',
      url: '/v1/search/movie.json',
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
      //error 모달창으로 띄우기
    });
  }

  const onGenre = (code) => {
    setGenre(code);
    page.current = 10;

    axios({
      method: 'get',
      //url: 'https://openapi.naver.com/v1/search/movie.json',
      url: '/v1/search/movie.json',
      params: {
        display : '10',
        query : searchInput.current.value,
        display: page.current,
        genre : code
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

  const addLike = (targetMovie) => {
    //localStorage.setItem(id.current,JSON.stringify(targetMovie));
    let likeList = JSON.parse(localStorage.getItem('likeList')) || [];
    likeList = likeList.concat(targetMovie); // [targetMovie]
    localStorage.setItem('likeList', JSON.stringify(likeList));
  }

  const removeLike = (targetMovie) => {
    const likeList = JSON.parse(localStorage.getItem('likeList'));
    console.log(likeList);

    localStorage.removeItem('likeList');
    localStorage.setItem('likeList',JSON.stringify(likeList.filter(like => 
      like.title !== targetMovie.title
    ))) 
  }

  // 제목, 감독, 이미지, 출연자, 평점
  return (
    <div className={styles.container}>
        <form className={styles.sContainer}>
            <input className={styles.input} type={'text'} placeholder='검색할 영화를 입력하세요.' ref={searchInput}/>
            <Button text={'검색'} bkcolor={'#FF5733'} ftcolor={'ivory'} onClick={(e) => {onSearch(e,searchInput.current.value)}}/>
        </form>
        <div className={styles.sContainer}>
          <button className={genre===''?styles.clickButton:styles.button} onClick={()=>{onGenre('')}}>전체보기</button>
          <button className={genre==='1'?styles.clickButton:styles.button} onClick={()=>{onGenre('1')}}>드라마</button>
          <button className={genre==='2'?styles.clickButton:styles.button} onClick={()=>{onGenre('2')}}>판타지</button>
          <button className={genre==='4'?styles.clickButton:styles.button} onClick={()=>{onGenre('4')}}>공포</button>
          <button className={genre==='5'?styles.clickButton:styles.button} onClick={()=>{onGenre('5')}}>로맨스</button>
          <button className={genre==='7'?styles.clickButton:styles.button} onClick={()=>{onGenre('7')}}>스릴러</button>
          <button className={genre==='8'?styles.clickButton:styles.button} onClick={()=>{onGenre('8')}}>느와르</button>
          <button className={genre==='10'?styles.clickButton:styles.button} onClick={()=>{onGenre('10')}}>다큐멘터리</button>
          <button className={genre==='11'?styles.clickButton:styles.button} onClick={()=>{onGenre('11')}}>코미디</button>
          <button className={genre==='12'?styles.clickButton:styles.button} onClick={()=>{onGenre('12')}}>가족</button>
          <button className={genre==='13'?styles.clickButton:styles.button} onClick={()=>{onGenre('13')}}>미스터리</button>
          <button className={genre==='14'?styles.clickButton:styles.button} onClick={()=>{onGenre('14')}}>전쟁</button>
          <button className={genre==='15'?styles.clickButton:styles.button} onClick={()=>{onGenre('15')}}>애니메이션</button>
          <button className={genre==='16'?styles.clickButton:styles.button} onClick={()=>{onGenre('16')}}>범죄</button>
          <button className={genre==='18'?styles.clickButton:styles.button} onClick={()=>{onGenre('18')}}>SF</button>
        </div>
        <div className={styles.movieContainer}>
         {
            data&&data.length>0
            ?data.map((data, index) => {
              let likeList = JSON.parse(localStorage.getItem('likeList')) || [];
              return (
                <MovieList key={index} movie={data} addLike={(e) => addLike(e)} removeLike={removeLike} likeList={likeList}/>
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