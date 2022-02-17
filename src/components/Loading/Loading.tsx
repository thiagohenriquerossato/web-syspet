import styles from './styles.module.scss'

export function Loading () {
  return (
    <div className={styles.loading}>
        <div className={styles.loadingCircle}>
          <div className={styles.circle}></div>
        </div>
      </div>
  )
}