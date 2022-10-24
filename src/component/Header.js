import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/header.module.css'

const Header = () => {

  const [like, setLike] = useState(false);
  const location = useLocation();
  // 현재 url 정보를 가져옴
  useEffect (()=> {
    location.pathname==='/likePage'?setLike(true):setLike(false)
  },[location])

  //현재 url의 변경을 감지해야함
  return (
    <div className={styles.row}>
      <h1 style={{color : 'white'}}>Movie Search</h1>
      <Link to="/likePage" className={styles.button}>
        찜 목록&nbsp;
        <img src={like?'https://cdn-icons-png.flaticon.com/512/833/833558.png':'https://cdn-icons-png.flaticon.com/512/5294/5294889.png'} style={{width:'25px'}}/>
      </Link>
    </div>
  )
}

export default Header