import { GiHamburger } from "react-icons/gi";
import { BsCart3 } from "react-icons/bs";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";


export const Header = () => {
    const { burgerToCart } = useAppSelector(state => state)
    console.log("из хедера"бburgerToCart)
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <Link to="/">
                    <div className={styles.burger}>
                        <GiHamburger size={50} className={styles.icon} />
                        <p className={styles.text}>
                            Вкусные
                            <br />
                            Бургеры
                        </p>
                    </div>
                </Link>
                <div style={{ position: "relative" }}>
                    <Link to="/cart">
                        <BsCart3 size={50} className={styles.icon} />
                    </Link>
                    <span>{ }</span>
                </div>
            </div>
        </div>
    );
};
