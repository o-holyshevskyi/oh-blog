import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';
import SetTheme from '../theme-util/theme-util';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTopButton from '../scroll-to-top/scroll-to-top';

export const name = 'Oleksandr Holyshevskyi';

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Oleksandr Holyshevskyi | Test Automation Engineer" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <SetTheme />
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
              <SetTheme />
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
        </div>
      )}
      <div className={utilStyles.content}>
        <div className={utilStyles.delimiterL}></div>
      </div>
      <footer className={utilStyles.footer}>
        <a href='/' className={utilStyles.footerItem}><strong>Home</strong></a>
        <div className={utilStyles.separator}></div>
        <a href='/about' className={utilStyles.footerItem}><strong>About</strong></a>
        <div className={utilStyles.separator}></div>
        <a href='https://github.com/o-holyshevskyi' target='_blank' className={utilStyles.footerItem}><strong>GitHub</strong></a>
        <div className={utilStyles.separator}></div>
        <a href='https://www.linkedin.com/in/oleksandr-holyshevskyi/' target='_blank' className={utilStyles.footerItem}><strong>LinkedIn</strong></a>
      </footer>
    </div>
  );
}
