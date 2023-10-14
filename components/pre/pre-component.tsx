import CopyButton from '../copy-button/copy-button';
import styles from './pre.module.css';

export function Pre({ 
    children,
    raw,
    ...props
}) {
    return (
      <pre {...props} className={`${styles.preContainer} ${props.className}`}>
        {children}
        <CopyButton text={raw}/>
      </pre>
    )
  }