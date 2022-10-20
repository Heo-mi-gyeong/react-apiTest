import React, { useState } from 'react'
import styles from '../styles/header.module.css'

const Header = () => {
  const [like, setLike] = useState(false);
  
  const onLike = () => {
    setLike(!like);
  }

  return (
    <div className={styles.row}>
      <h1 style={{color : 'white'}}>Movie Search</h1>
      <button onClick={onLike} className={styles.button}>
        {/* 찜 목록 조회 화면으로 이동 */}
        <p>찜 목록</p>&nbsp;
        <img src={like?'https://cdn-icons-png.flaticon.com/512/833/833558.png':'https://cdn-icons-png.flaticon.com/512/5294/5294889.png'} style={{width:'25px'}}/>
      </button>
    </div>
  )
}

export default Header