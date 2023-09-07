import styles from './oneBurgerFromCart.module.scss';
import { IBurger } from '../../types';
import React from 'react';

interface IOneBurgerFromCart {
    burger: IBurger
}

export const OneBurgerFromCart = ({ burger }: IOneBurgerFromCart) => {
    const [burgerPrice, setBurgerPrice] = React.useState<number>(burger.price);
    const [burgerItem, setBurgerItem] = React.useState<number>(1);

    const handleClick = () => {
        setBurgerPrice(burgerPrice + burger.price)
        setBurgerItem(burgerItem++)
    }
    return (
        <div className={styles.position}>
            <img className={styles.image} src={`./burgerImg/${burger.image}`} />
            <div>
                <p style={{ textAlign: "center" }}>Количество</p>
                <div style={{ textAlign: "center" }}><span className={styles.button}>-</span>{burgerItem}<span className={styles.button} onClick={handleClick}>+</span></div>
            </div>
            <div>
                Цена за шт <span>{burgerPrice} руб.</span>
            </div>
        </div>
    );
};

