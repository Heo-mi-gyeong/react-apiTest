import React from 'react'
import styles from './button.module.css'

const Button = ({text, bkcolor, ftcolor, onClick}) => {
  return (
    <button 
    onClick = {onClick}
    className={styles.button}
    style={{
        backgroundColor : bkcolor,
        color : ftcolor
    }}
    ><b>{text}</b></button>
  )
}

export default Button