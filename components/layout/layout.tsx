import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';

export const name = 'Oleksandr Holyshevskyi';
const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/oleksandr-holyshevskyi/',
    img: '/images/linkedin-50.png',
    target: '_blank'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/o-holyshevskyi',
    img: '/images/github-50.png',
    target: '_blank'
  },
  {
    name: 'About',
    url: '/about',
    img: '/images/about-50.png',
    target: '_self'
  }
];

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {
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
            <Link
              href='/about'
            >
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
            </Link>
            <h1 className={utilStyles.heading2Xl}><span style={{color: 'red'}}>{name.charAt(0)}</span>{name.slice(1)}</h1>
            <div className={utilStyles.delimiterL}></div>
          </>
        ) : (
          <>
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
                <span style={{color: 'red'}}>{name.charAt(0)}</span>{name.slice(1)}
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
          {socialLinks.map((sl, i) => (
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
