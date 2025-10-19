import React, { forwardRef } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Heading, Box, Link, VStack, HStack, Image, Icon } from '@chakra-ui/react';
import { FaStar } from "react-icons/fa";

const Home = (props) => {
    return (
        <Box p={5}>
            <Heading fontSize={{base: "24px"}} mb={10} fontWeight={"bold"}>店舗一覧</Heading>
            <Box>
                <VStack spaceY={5} align={"stretch"}>
                {props.shops.map((shop) => (
                    <Link href={route('shop.detail', {id: shop.id})} key={shop.id} borderWidth={"1px"} borderRadius={"md"}>
                        <HStack>
                            <Image src={"https://placehold.jp/150x150.png"} />
                            <VStack ml={5}>
                                <Heading fontSize={"20px"} fontWeight={"bold"}>{shop.name}</Heading>
                                <Box>
                                    <HStack>
                                        {
                                            shop.reviews.length > 0 ? (
                                                shop.reviews.map((review) => (
                                                    // console.log(review.rate)
                                                    Array(5).fill("").map((_, i) => (
                                                        <Icon key={i} as={FaStar} size={"lg"} color={i < review.rate ? "yellow.500" : "gray.500" } />
                                                    ))
                                                ))
                                            ) : (
                                                Array(5).fill("").map((_, i) => (
                                                    <Icon key={i} as={FaStar} size={"lg"} color={"gray.500"} />
                                                ))
                                            )
                                        }
                                    </HStack>
                                </Box>
                            </VStack>
                        </HStack>
                    </Link>
                ))}
                </VStack>
            </Box>
        </Box>
    );
};

Home.layout = (page) => <MainLayout children={page} title="ホーム画面" />
export default Home
