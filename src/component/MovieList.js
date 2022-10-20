import React from 'react'
import styles from '../styles/movieList.module.css'

const MovieList = ({movie}) => {
  const goSite = () => {
    window.location.href = movie.link ;
  }
  return (
    <div className={styles.item}>
        <h3 dangerouslySetInnerHTML={ {__html: movie.title} }></h3>
        <p>◾ 감독 : {movie.director}</p>
        {/* 페이징 처리 + 장르별 검색 */} 
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