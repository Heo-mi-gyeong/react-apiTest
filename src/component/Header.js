import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css'

const Header = () => {

  const [like, setLike] = useState(false);
  const check = (check) => {
    console.log(check);
    setLike(check);
  }

  return (
    <div className={styles.row}>
      <h1 style={{color : 'white'}}>Movie Search</h1>
      <Link to="/likePage" onClick={() => setLike(true)} className={styles.button}>
        찜 목록&nbsp;
        <img src={like?'https://cdn-icons-png.flaticon.com/512/833/833558.png':'https://cdn-icons-png.flaticon.com/512/5294/5294889.png'} style={{width:'25px'}}/>
      </Link>
    </div>
  )
}

export default Header