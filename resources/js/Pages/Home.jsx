import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Heading, Box, Link, VStack, HStack, Image, Text, Button } from '@chakra-ui/react';
import StarRating from '@/Components/Custom/StarRating';
import { router } from '@inertiajs/react';

const Home = (props) => {
    const handlePageChange = (url) => {
        router.get(url);
    };

    const getButtonLabel = (label) => {
        if(label.includes("previous")) return "前へ";
        if(label.includes("next")) return "次へ";
        return label;
    };

    return (
        <Box>
            <Heading fontSize={{base: "24px"}} mb={10} fontWeight={"bold"}>店舗一覧</Heading>
            <Box>
                <VStack spaceY={5} align={"stretch"}>
                {props.shops.data.map((shop) => (
                    <Link href={route('shop.detail', {id: shop.id})} key={shop.id} borderWidth={"1px"} borderRadius={"md"}>
                        <HStack>
                            <Image src={"https://placehold.jp/150x150.png"} />
                            <VStack ml={5} alignItems={"flex-start"}>
                                <Heading fontSize={"20px"} fontWeight={"bold"}>{shop.name}</Heading>
                                <Box display={"flex"} arignItems={"center"}>
                                    <StarRating rating={shop.reviews_avg_rate} percentage={parseFloat(Number(shop.reviews_avg_rate).toFixed(1).slice(2)) * 10} />
                                    <Text ml={5}>レビュー合計: {shop.reviews_count}件</Text>
                                </Box>
                            </VStack>
                        </HStack>
                    </Link>
                ))}
                </VStack>
            </Box>
            <HStack justifyContent={"center"} alignItems={"center"} mt={5}>
                {props.shops.links.map((link, index) => (
                    <Button
                        key={index}
                        onClick={() => handlePageChange(link.url)}
                        bg={link.active ? "yellow.500" : "gray.100"}
                        isDisabled={!link.url}
                    >
                        {getButtonLabel(link.label)}
                    </Button>
                ))}
            </HStack>
        </Box>
    );
};

Home.layout = (page) => <MainLayout children={page} title="ホーム画面" />
export default Home
