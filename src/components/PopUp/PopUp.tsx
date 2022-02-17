import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'
import styles from './styles.module.scss'


type PopUpProps = {
  children: ReactNode;
  trigger: boolean
  setTrigger: (trigger: boolean) => void;
}

export function PopUp(props: PopUpProps) {
  
  return (props.trigger ? (
    <div className={styles.popUp}>
      <div className={styles.popUpInner}>
        <button className={styles.closeBtn} onClick={()=>props.setTrigger(false)}>
          <MdClose/>
        </button>
        {props.children}
      </div>
    </div>
  ) : <></>)
}