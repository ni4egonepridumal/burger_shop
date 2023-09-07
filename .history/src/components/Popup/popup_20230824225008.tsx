import React from 'react';
import styles from "./popup.module.scss"
import { ChoiseBurger } from '../Burger';

interface IPopup {
    popup: boolean,
    setPopup: (arg0: boolean) => void,

}

export const Popup: React.FC<IPopup> = ({ popup, setPopup }) => {
    return (
        <div className={styles.modal}>
            <div onClick={() => setPopup(!popup)} className={styles.overlay}></div>
            <div className={styles.modal_content}>
                <ChoiseBurger popup={popup} setPopup={setPopup} />
            </div>

        </div>
    );
};

