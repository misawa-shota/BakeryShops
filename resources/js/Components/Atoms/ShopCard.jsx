import React from 'react';
import ShopData from '../Parts/ShopData';
import { Link } from '@chakra-ui/react';

function ShopList(props) {
    return (
        <Link href={route('shop.detail', {id: props.shop.id})} key={props.shop.id} borderWidth={"1px"} borderRadius={"md"}>
            <ShopData
                homeShopData={"トップページの店舗情報"}
                shopName={props.shop.name}
                shopReviewsAvgRate={props.shop.reviews_avg_rate}
                shopReviewsCount={props.shop.reviews_count}
            />
        </Link>
    )
}

export default ShopList
