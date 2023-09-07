import React from "react";
import { Button } from "../Button";
import styles from "./burger.module.scss";
import { Feedback } from "../Feedback/feedback";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { InputFromRHF } from "../InputFromRHF";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addBurgerToCart, deleteBurgerFromCart } from '../../redux/slices/addBurgerToCartSlice'
import { IBurger } from "../../types";
import { useAddCommentFromClientMutation } from "../../redux";



type InputForm = {
    name: string,
    comment: string,
}

type IBurgerPage = {
    popup: boolean,
    setPopup: (arg0: boolean) => void
    burgers: IBurger,
}

export const ChoiseBurger = ({ popup, setPopup, burgers }: IBurgerPage) => {
    const { aboutBurger, burgerToCart } = useAppSelector(state => state)
    const [addComment, { isError }] = useAddCommentFromClientMutation();
    const [flag, setFlag] = React.useState(false);

    const cloneBurgerObj = structuredClone(burgers)

    const addNewComment = async (dataFromForm: InputForm, cloneBurgerObj: IBurger) => {
        await cloneBurgerObj.comments.push(dataFromForm)
        await addComment(cloneBurgerObj).unwrap()
    }
    const dispatch = useAppDispatch();

    const handleClick = () => {
        !choiseBurger ? addBurgerFromCart() : removeBurgerfromCart()
    }
    const handleFlag = () => {
        setFlag(!flag);
        alert("коментарий добавлен, после модерации он появится")
    }
    const addBurgerFromCart = () => {
        dispatch(addBurgerToCart(burgers))
    }
    const removeBurgerfromCart = () => {
        dispatch(deleteBurgerFromCart(burgers.id))
    }
    let burgerFromLocalStorage = [];
    burgerFromLocalStorage = JSON.parse(localStorage.getItem("burger"));
    const choiseBurger = burgerFromLocalStorage ? burgerFromLocalStorage?.some((burger: IBurger) => burger.id === burgers.id) : burgerToCart?.some((burger: IBurger) => burger.id === burgers.id)
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<InputForm>({
        mode: "onBlur"
    })
    const onSubmit: SubmitHandler<InputForm> = (data) => addNewComment(data, cloneBurgerObj)
    return (
        <div className={styles.container}>
            {aboutBurger.map(burger =>
                <div key={burger.id} className={styles.inner}>
                    <img src={`./burgerImg/${burger.image}`} />
                    <div>
                        <div><span className={styles.text_color}>Цена:</span> {burger.price} руб.</div>
                        <div className={styles.text_color}>Состав:</div>
                        <div>{burger.composition}</div>
                        <div className={styles.text_color}>Добавить комментарий:</div>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.feedback_size}>
                            <Controller
                                control={control}
                                name="name"
                                rules={{ required: true, pattern: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/ }}
                                render={({ field: { onChange, onBlur } }) => (
                                    <InputFromRHF
                                        onMyChange={onChange}
                                        onMyBlur={onBlur}
                                        label="Ваше имя"
                                        placeholder="Например: Анатолий"
                                        type="text"
                                    />
                                )}
                            />
                            <span style={{ color: "red", fontSize: "18px" }}>{errors?.name && "Поле обязательное для заполнения"}</span>
                            <Controller
                                control={control}
                                name="comment"
                                render={({ field: { onChange, onBlur } }) => (
                                    <InputFromRHF
                                        onMyChange={onChange}
                                        onMyBlur={onBlur}
                                        label="Комментарий"
                                        placeholder="Это божественно"
                                        type="text"
                                    />
                                )}
                            />
                            <div style={{ marginTop: "15px" }}>
                                <Button viev="primary" type="submit" size='s' onClick={handleFlag}>Добавить</Button>
                            </div>
                        </form>
                        <div className={styles.overflow}>
                            <div className={styles.text_color}>Отзывы:</div>

                            <div>{burger.comments.map((item: { name: string, comment: string }) => <Feedback key={item.comment} itemComment={item} />)}</div>
                        </div>

                    </div>
                </div>
            )
            }
            <div className={styles.position}>
                <div style={{ marginRight: "15px" }}>
                    <Button onClick={() => setPopup(!popup)} viev="secondary" size='m'>Вернуться</Button>
                </div>
                <div>
                    <Button viev={'secondary'} size='m' onClick={handleClick}>{choiseBurger ? "Удалить" : "В корзину"}</Button>
                </div>
            </div>
        </div >
    );
};

