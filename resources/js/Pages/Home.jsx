import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Heading, Box, VStack } from '@chakra-ui/react';
import CardList from '@/Components/Molecules/CardList';
import Pagination from '@/Components/Parts/Pagination';

const Home = (props) => {

    return (
        <Box>
            <Heading fontSize={{base: "24px"}} mb={10} fontWeight={"bold"}>店舗一覧</Heading>
            <Box>
                <VStack spaceY={5} align={"stretch"}>
                    <CardList
                        cardList={"店舗リスト"}
                        shopLists={props.shops.data}
                    />
                </VStack>
            </Box>

            {/* ページネーション */}
            <Pagination shopsLinks={props.shops.links} />
            {/* ページネーション */}
        </Box>
    );
};

Home.layout = (page) => <MainLayout children={page} title="ホーム画面" />
export default Home
