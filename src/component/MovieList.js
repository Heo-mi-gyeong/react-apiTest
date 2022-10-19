import React from 'react'

const MovieList = ({movie}) => {
  return (
    <div>
        <p dangerouslySetInnerHTML={ {__html: movie.title} }></p>
        <p>감독 : {movie.director}</p>
        <img src={movie.image}></img> {/* 라우터 이용해서 이미지 클릭시 영화 사이트로 이동 + 페이징 처리 */} 
        <p>출연 : {movie.actor}</p>
        <p>⭐평점⭐ : {movie.userRating}</p>
    </div>
  )
}

export default MovieList