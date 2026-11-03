import { PropsWithChildren, useEffect, useState } from "react";

import styles from "./styles.module.css";
import cls from "../../../utils/cls";

interface IModalLayoutProps extends PropsWithChildren {
  title?: string;
  disableClose?: boolean;
  className?: string;
}

const ModalLayout: ModalFC<IModalLayoutProps> = ({  children,title='', onCancel, className = "" }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    setIsOpen(false)
    setTimeout(() => {
      if (onCancel) onCancel();
    }, 200)
  }
  
  return (
    <>
      <div className={styles.ModalLayoutOverlay}  onClick={handleCancel} />
      <div
        className={cls(styles.ModalLayout, {
          [styles.IsOpen]: isOpen,
          [className]: !!className,
        })}
      >
        <div className={styles.ModalLayoutHeader}>
          <div className={styles.ModalLayoutHeaderTitle}>
          {title}
          </div>
          <div className={styles.ModalLayoutHeaderClose} onClick={handleCancel}>
            <img className="w-[30px] h-[30px]" src='/icons/modal-close-icon.png'/>
          </div>
        </div>
        <div className={styles.ModalLayoutBody}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalLayout;