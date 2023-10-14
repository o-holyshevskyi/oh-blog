import { useState } from 'react';
import styles from './copy-button.module.css';
import Image from 'next/image';

export default function CopyButton ({ text }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  const imagePath = isCopied ? '/images/copy-button/checked-checkbox-30.png' : '/images/copy-button/clipboard-30.png'; 

  return (
    <div className={styles.buttonContainer}>
      <button 
        disabled={isCopied}
        onClick={copy}
        className={styles.copyButton} 
      >
        <Image src={imagePath} alt='clipboard' width={20} height={20}/>
        <span className={styles.buttonText}>{isCopied ? 'Copied!' : 'Copy'}</span>
      </button>
    </div>
  )
}
