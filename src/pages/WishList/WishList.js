import { useDataContext } from '../../context/cartContextProvider';
import { Card } from '../../components/Card/Card';
import './wishlist.css';

export const WishList = () => {

    const { state } = useDataContext();
    const { wishList, cart, products } = state;

    const inCartAndWishList = (itemArr) => {

        const newArr = itemArr.map(item => {
            return {
                ...item,
                inCart: cart.find(cartItem => cartItem.id === item.id) ? true : false,
                inWishList: wishList.find(wishItem => wishItem.id === item.id) ? true : false
            }
        })
        return newArr;
    }

    const finalList = inCartAndWishList(products)

    return (
        <div className="wishListComponent">
            <span className="util-heading-medium">WISHLIST</span>
            <div className="wishList">
                {finalList.map(i => i.inWishList ? <Card key={i.id} data={i} /> : null)}
            </div>
        </div>
    )
}