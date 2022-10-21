import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/like.module.css'
import MovieList from './MovieList';

const Like = () => {
    const navigate = useNavigate();
    const [data,setDate] = useState([]);
    const [check,setCheck] = useState(true);

    useEffect(()=>{
        const likeList = JSON.parse(localStorage.getItem('likeList'));
        setDate(likeList);
    },[check])


    const addLike = (targetMovie) => {
        let likeList = JSON.parse(localStorage.getItem('likeList')) || [];

        likeList = likeList.concat(targetMovie); // [targetMovie]
        localStorage.setItem('likeList', JSON.stringify(likeList));
    }
    
    const removeLike = (targetMovie) => {
        const likeList = JSON.parse(localStorage.getItem('likeList'));
    
        localStorage.removeItem('likeList');
        localStorage.setItem('likeList',JSON.stringify(likeList.filter(like => 
            like.title !== targetMovie.title
        ))) 
        setCheck(!check);
    }

  return (
    <div className={styles.container}>
        <div className={styles.back}>
            <img style={{width:'60px'}} src='https://cdn-icons-png.flaticon.com/512/2997/2997885.png' onClick={() => navigate(-1)}/> 
        </div>
        <div className={styles.movieContainer}>
         {
            data&&data.length>0
            ?data.map((data, index) => {
              let likeList = JSON.parse(localStorage.getItem('likeList')) || [];
              return (
                <MovieList key={index} movie={data} addLike={addLike} removeLike={removeLike} likeList={likeList}/>
              )
            })
            :(
                <h3 style={{color : '#cccccc'}}>찜한 내역이 없습니다.</h3>
            )
        }
        </div>
    </div>
  )
}

export default Like