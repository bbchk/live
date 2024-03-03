import OrderCard from "./order-card";

export default function OrderCardList(
    {
        list = [["ErrorImgUrl", "ErrorProductName", 0, 0]]
    })
{

    return (
        <>
            {list.map(function(order)  {
                return (
                    <div key = {order[1]}>
                        <OrderCard imageUrl={order[0]} naming={order[1]} amount={order[2]} price={order[3]}></OrderCard>
                    </div>
                )
            })}
        </>
    )
}