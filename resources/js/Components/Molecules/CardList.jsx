import React, { memo } from 'react';
import ShopCard from '../Atoms/ShopCard';
import ReviewCard from '../Atoms/ReviewCard';
import { Text } from '@chakra-ui/react';

const CardList = memo((props) => {
    console.log("CardList レンダリング");
    return (
        <>
            {props.cardList === "店舗リスト" && props.shopLists.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
            ))}
            {props.cardList === "レビューリスト" && props.shopReviews.length > 0 ? (
                props.shopReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} dialogOpen={props.dialogOpen} />
                ))
            ) : (
                <Text>レビューはまだありません</Text>
            )}
        </>
    )
});

export default CardList
