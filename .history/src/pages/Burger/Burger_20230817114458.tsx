import { useAppSelector } from "../../redux/hooks";

export const BurgerPage = () => {
    const choseBurger = useAppSelector(state => state)
    console.log(choseBurger)
    return (
        <div>
            Страница одного выбранного бургера
        </div>
    );
};

