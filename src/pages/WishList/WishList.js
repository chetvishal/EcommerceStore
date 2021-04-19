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
                inCart: cart.find(cartItem => cartItem._id === item._id) ? true : false,
                inWishList: wishList.find(wishItem => wishItem._id === item._id) ? true : false
            }
        })
        return newArr;
    }

    const finalList = inCartAndWishList(products)

    return (
        <div className="wishListComponent">
            <span className="util-heading-medium">WISHLIST</span>
            <div className="wishList">
                {finalList.map(i => i.inWishList ? <Card key={i._id} data={i} /> : null)}
            </div>
        </div>
    )
}