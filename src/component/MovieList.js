import React, { useEffect, useState } from 'react'
import styles from '../styles/movieList.module.css'
import Modal from './Modal'

const MovieList = ({movie,data,addLike,removeLike,likeList}) => {

  const [like, setLike] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(
    ()=>{
      setLike(false);
      likeList.map((list) => {
        if(list.title===movie.title){
            setLike(true);
        }
      })
  }
  ,[data])

  const goSite = () => {
    window.location.href = movie.link ;
  }

  return (
    <>
      {
        openModal
        ? <Modal openModal={setOpenModal} movie={movie}/>
        :null
      }
      <div className={styles.item} onClick={() => setOpenModal(true)}>
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
    </>
  )
}

export default MovieList