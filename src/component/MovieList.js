import React, { useEffect, useState } from 'react'
import styles from '../styles/movieList.module.css'

const MovieList = ({movie,addLike,removeLike,likeList}) => {

  const [like, setLike] = useState(false);

  //이슈1. 조회결과가 달라도 그 위치의 영화가 찜 되어있음
  //이슈2. 자기 자신은 잘 사라짐(삭제한 요소 뒤 요소 하나씩 하트 해제됨)
  //이슈3. Link에 이벤트 함수 못넣음
  useEffect(
    ()=>{
      likeList.map((list,index) => {
        if(list.title===movie.title){
            setLike(true);
        }
      })
  }
  ,[like])
  
  useEffect (()=>{
    //찜 화면에서는 삭제된 요소가 false로 변하고 출력됨
    console.log(like);
    console.log(movie.title);
  },
  [like])

  const goSite = () => {
    window.location.href = movie.link ;
  }


  return (
    <div className={styles.item}>
      <div className={styles.row}>
        <h3 dangerouslySetInnerHTML={ {__html: movie.title} }></h3>
        <img src={like?'https://cdn-icons-png.flaticon.com/512/833/833558.png':'https://cdn-icons-png.flaticon.com/512/5294/5294889.png'} style={{width:'30px'}} 
              onClick={
                like?(
                    ()=>{
                      removeLike(movie)
                      setLike(!like)
                  }):(
                    () => {
                      addLike(movie)
                      setLike(!like)
                    }
                  )
              }/>
      </div>
        <p>◾ 감독 : {movie.director}</p>
        {
          movie.image
          ?(
              <img className={styles.image} src={movie.image} title={'보러가기'} onClick={goSite}></img> 
            )
          :(
              <img className={styles.image} src="https://내안의숲.com/images/noimage.gif" title={'보러가기'} onClick={goSite}></img> 
          )
        }
        {
        movie.actor
          ?(
            <p>◾ 출연 : {movie.actor}</p>
          )
          :(
            <p>◾ 출연 : 정보 없음</p>
          )
        }
        <p>⭐평점⭐ : {movie.userRating}</p>
    </div>
  )
}

export default MovieList