import { ReactElement } from 'react'
import styles from './styles.module.scss'

type ContainerProps = {
  headerBar: ReactElement;
  content: ReactElement;
}

export function Container({headerBar, content}: ContainerProps){
  return (
    <div className={styles.container}>
      {headerBar}
      {content}
    </div>
    )
}