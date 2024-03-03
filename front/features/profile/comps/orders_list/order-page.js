
import {Button} from "react-bootstrap";
import OrderCardList from "./order-card-list";

export default function OrderPage(
    {

    })
{

    return (
        <>
            <div>
                <div>
                    <a href={"HOME_URL"}>Повернутись на головну</a>
                </div>
                <div>
                    <p>Name</p>
                    <p>Phone</p>
                    <Button>Редагувати</Button>
                </div>
                <div>
                    <p>City</p>
                    <p>Region</p>
                    <Button>Редагувати</Button>
                </div>
                <div>
                    <p>Замовлення</p>
                    <Button>Редагувати</Button>
                    <div>
                        <p>Товари</p>
                        <OrderCardList list={[["", "Name", 3, 2], ["", "Name2", 3, 4]]}></OrderCardList>
                    </div>
                </div>
                <div>
                    <p>Доставка</p>
                    <div>
                        <p>Delivery options here</p>
                    </div>
                </div>
                <div>
                    <p>Оплата</p>
                    <div>
                        <p>Payment options here</p>
                    </div>
                </div>
                <div>
                    <p>Отримувач замовлення</p>
                    <div>
                        <p>Name</p>
                        <p>Phone</p>
                        <Button>Редагувати</Button>
                    </div>
                    <p> Зверніть увагу, отримання замовлення за паспортом. Введіть прізвище, ім'я, по батькові як
                        зазначено у документі та мобільний номер телефону отримувача замовлення</p>
                </div>

                <div>
                    <div>
                        <h3>Разом</h3>
                        <p>{} {} на суму {}</p>
                        <p>Вартість доставки {} </p>
                    </div>
                    <div>
                        <p>До сплати: {}</p>
                    </div>
                    <div>
                        <Button>Замовлення підтверджую</Button>
                        <p>Підтверджуючи замовлення, я приймаю умови:</p>
                        <ul>
                            <li><a href={"personal_data_policy_url"}>Положення про обробку і захист персональних даних</a></li>
                            <li><a href={"user_agreement_url"}>Угоди користувача</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}