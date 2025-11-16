import React, { memo } from 'react';
import HomeStarRating from './HomeStarRating';
import { HStack, Image, VStack, Heading, Box, Text } from '@chakra-ui/react';

const ShopData = memo((props) => {
    console.log("ShopData.jsx レンダリング");
    return (
        <>
            {props.homeShopData === "トップページの店舗情報" && (
                <HStack>
                    <Image src={"https://placehold.jp/150x150.png"} />
                    <VStack ml={5} alignItems={"flex-start"}>
                        <Heading fontSize={"20px"} fontWeight={"bold"}>{props.shopName}</Heading>
                        <Box display={"flex"} arignItems={"center"}>
                            <HomeStarRating rating={props.shopReviewsAvgRate} percentage={parseFloat(Number(props.shopReviewsAvgRate).toFixed(1).slice(2)) * 10} />
                            <Text ml={5}>レビュー合計: {props.shopReviewsCount}件</Text>
                        </Box>
                    </VStack>
                </HStack>
            )}
            {props.detailShopData === "詳細ページの店舗情報" && (
                <>
                    <Heading my={5} as={"h2"} fontSize={"30px"} fontWeight={"bold"}>{props.shopName}</Heading>
                    <HStack display={"flex"} alignItems={"center"} spaceX={5}>
                        <Image src={"https://placehold.jp/150x150.png"} width={"300px"} />
                        <Box spaceY={5}>
                            <Box>
                                <Text fontWeight={"bold"}>所在地</Text>
                                <Text>{props.shopLocate}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight={"bold"}>店舗情報</Text>
                                <Text>{props.shopDescription}</Text>
                            </Box>
                        </Box>
                    </HStack>
                </>
            )}
        </>
    )
});

export default ShopData
