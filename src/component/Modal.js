import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/modal.module.css'
import Lottie from 'lottie-react'
import loading from '../assets/loading.json'
import Button from './button/Button'

const Modal = ({openModal,movie}) => {
    const [active, setActive ] = useState(false);
    const count = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            count.current += 1;
            if(count.current===3){
                clearInterval(interval);
                setActive(true);
            }
          }, 500);
        count.current = 0;
    },[movie]);

    const goSite = () => {
        window.location.href = movie.link ;
      }

    // 모달 위치 잡기
    // 화면 크키가 변경되어도 모달은 그자리에 보여야함
  return (
    <div className={styles.modal}>
        <div className={styles.container}>
            <div className={styles.close}>
                <img src='https://cdn-icons-png.flaticon.com/512/1828/1828744.png' className={styles.image} onClick={() => openModal(false)}/>
            </div>
            <div className={styles.sContainer}>
           {active 
           ? (<>
                <div className={styles.row}>
                    <h2 dangerouslySetInnerHTML={ {__html: movie.title} }></h2>
                    <Button text={'보러가기'} onClick={goSite} bkcolor={'#751BFF'} ftcolor={'white'}/>
                </div>
                <p>◾ 감독 : {movie.director}</p>
                {
                    movie.image
                    ?(
                        <img className={styles.image} src={movie.image} title={'보러가기'} ></img> 
                    )
                    :(
                        <img className={styles.image} src="https://내안의숲.com/images/noimage.gif"></img> 
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
            </>
           )
            :<Lottie animationData={loading} className={styles.loading}/>
            }
            </div>
        </div>
    </div>
  )
}

export default Modal