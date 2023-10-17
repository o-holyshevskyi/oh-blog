import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';
import SetTheme from '../theme-util/theme-util';
import { useTheme } from '../theme-util/theme-context';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTopButton from '../scroll-to-top/scroll-to-top';

export const name = 'Oleksandr Holyshevskyi';

const socialLinks = (theme: string) => [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/oleksandr-holyshevskyi/',
    img: theme === 'light' ? '/images/linkedin-50l.png' : '/images/linkedin-50d.png',
    target: '_blank'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/o-holyshevskyi',
    img: theme === 'light' ? '/images/github-50l.png' : '/images/github-50d.png',
    target: '_blank'
  },
  {
    name: 'About',
    url: '/about',
    img: theme === 'light' ? '/images/about-50l.png' : '/images/about-50d.png',
    target: '_self'
  }
];

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {
  const {theme, toggleTheme} = useTheme();
  
  return (
    <div className={styles.container}>
      <Head>
        <meta name="og:title" content={name} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <SetTheme handleTheme={toggleTheme}></SetTheme>
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
              <SetTheme handleTheme={toggleTheme}></SetTheme>
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
      <main>
        {children}
        <ScrollToTopButton />
        <Analytics />  
      </main>
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
              <Image
                priority
                src={sl.img}
                className={`${utilStyles.borderCircle} ${utilStyles.socialMediaImg}`}
                height={50}
                width={50}
                alt={sl.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
