import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import SetTheme from '../theme-util/theme-util';

export const name = 'Oleksandr Holyshevskyi';

const socialLinks = (theme: string) => [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/oleksandr-holyshevskyi/',
    img: <svg className={`${utilStyles.borderCircle} ${utilStyles.socialMediaImg}`} fill={theme === 'light' ? 'var(--primary-dim)' : 'var(--primary-dim)'} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50">
            <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5 S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z"></path>
        </svg>,
    target: '_blank'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/o-holyshevskyi',
    img: <svg className={`${utilStyles.borderCircle} ${utilStyles.socialMediaImg}`} fill={theme === 'light' ? 'var(--primary-dim)' : 'var(--primary-dim)'} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50">
          <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
        </svg>,
    target: '_blank'
  },
  {
    name: 'About',
    url: '/about',
    img: <svg className={`${utilStyles.borderCircle} ${utilStyles.socialMediaImg}`} fill={theme === 'light' ? 'var(--primary-dim)' : 'var(--primary-dim)'} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50">
          <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
        </svg>,
    target: '_self'
  }
];

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {
  const [theme, setTheme] = useState('light');
  
  function handleTheme(theme: string) {
    setTheme(theme);
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Test Automation Engineer"
        />
        <meta name="og:title" content={name} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <SetTheme handleTheme={handleTheme}></SetTheme>
            <Link
              href='/about'
            >
              <div className={utilStyles.imgContainer}>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={144}
                  width={144}
                  alt={name}
                />
                <div className={utilStyles.semicircleOverlay}>
                <div className={utilStyles.searchIcon}>
                  <div className={utilStyles.handle}></div>
                  <div className={utilStyles.circle}></div>
                </div>
                </div>
              </div>
            </Link>
            <h1 className={utilStyles.heading2Xl}><span className='cap'>{name.charAt(0)}</span>{name.slice(1)}</h1>
            <div className={utilStyles.delimiterL}></div>
          </>
        ) : (
          <>
            <div style={{display: 'none'}}>
              <SetTheme handleTheme={handleTheme}></SetTheme>
            </div>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                <span className='cap'>{name.charAt(0)}</span>{name.slice(1)}
              </Link>
            </h2>
            <div className={utilStyles.delimiterL}></div>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
          </div>
          <div>

          </div>
        </div>
      )}
      <div className={utilStyles.content}>
        <div className={utilStyles.delimiterL}></div>
      </div>
      <div className={utilStyles.content}>
        <div className={utilStyles.socialMedias}>
          {socialLinks(theme).map((sl, i) => (
            <Link 
              href={sl.url}
              target={sl.target}
              key={i}
            >
              {sl.img}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
