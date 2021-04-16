import { useDataContext } from '../../context/cartContextProvider';
import { Card } from '../../components/Card/Card';
import './wishlist.css';

export const WishList = () => {

    const { state } = useDataContext();

    return (
        <div className="wishListComponent">
            <span className="util-heading-medium">WISHLIST</span>
            <div className="wishList">
                {state.wishList.map(i => <Card key={i.id} data={i} />)}
            </div>
        </div>
    )
}