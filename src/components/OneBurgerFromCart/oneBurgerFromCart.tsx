import React from 'react';
import styles from './oneBurgerFromCart.module.scss';
import { IBurger } from '../../types';
import { Button } from '../Button';
import { deleteBurgerFromCart } from '../../redux/slices/addBurgerToCartSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setCountPlusBurger, setCountMinusBurger } from "../../redux/slices/addBurgerToCartSlice";


interface IOneBurgerFromCart {
    burger: IBurger,
}

export const OneBurgerFromCart: React.FC<IOneBurgerFromCart> = ({ burger }: IOneBurgerFromCart) => {
    const [burgerPrice, setBurgerPrice] = React.useState<number>(burger.price * burger.count);
    const dispatch = useAppDispatch()
    const handlePlusClick = () => {
        setBurgerPrice(burgerPrice + burger.price)
        dispatch(setCountPlusBurger(+burger.id))
    }
    const handleMinusClick = () => {
        if (burger.count !== 1) {
            dispatch(setCountMinusBurger(+burger.id))
            setBurgerPrice(burgerPrice - burger.price)
        }
    }
    return (
        <div className={styles.position}>
            <img className={styles.image} src={`./burgerImg/${burger.image}`} />
            <div style={{ margin: '0 15px' }}>
                <p style={{ textAlign: "center" }}>Количество</p>
                <div style={{ textAlign: "center" }}>
                    <span className={styles.button} onClick={handleMinusClick}>-</span>
                    {burger.count}
                    <span className={styles.button} onClick={handlePlusClick}>+</span>
                </div>
            </div>
            <div style={{ margin: '0 15px' }}>
                Цена <span>{burgerPrice} руб.</span>
            </div>

            <Button viev='primary' size="s" onClick={() => dispatch(deleteBurgerFromCart(burger.id))}>Удалить</Button>

        </div>
    );
};

