import React, { useCallback, useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Box, Heading, HStack, Icon, Image, Text, Link, Button } from '@chakra-ui/react';
import { toaster } from '../../../../src/components/ui/toaster';
import { router } from '@inertiajs/react';
import CustomDialog from '@/Components/Parts/CustomDialog';
import ShopData from '@/Components/Parts/ShopData';
import CardList from '@/Components/Molecules/CardList';

const Detail = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    console.log("Detail.jsx レンダリング");

    useEffect(() => {
        const timerId = setTimeout(() => {
            if(props.status === "create-review"){
                toaster.create({
                    title: "投稿成功",
                    description: "レビューの投稿に成功しました。",
                    type: "success",
                    closable: true,
                    duration: 5000,
                });
            } else if(props.status === "error-review"){
                toaster.create({
                    title: "投稿失敗",
                    description: "レビューの投稿に失敗しました。",
                    type: "error",
                    closable: true,
                    duration: 5000,
                });
            } else if(props.status === "update-review"){
                toaster.create({
                    title: "更新成功",
                    description: "レビューの更新に成功しました。",
                    type: "success",
                    closable: true,
                    duration: 5000,
                });
            } else if(props.status === "error-update-review"){
                toaster.create({
                    title: "更新失敗",
                    description: "レビューの更新に失敗しました。",
                    type: "error",
                    closable: true,
                    duration: 5000,
                });
            } else if(props.status === "delete-review"){
                toaster.create({
                    title: "削除成功",
                    description: "レビューの削除に成功しました。",
                    type: "success",
                    closable: true,
                    duration: 5000,
                });
            }
        }, 0);
        return () => clearTimeout(timerId);
    }, [props.status]);

    const dialogOpen = useCallback((id) => {
        setReviewId(id);
        setIsDialogOpen(true);
    }, []);

    const dialogClose = useCallback((e) => {
        e.preventDefault();
        setIsDialogOpen(false);
    }, []);

    const handleOpenChange = useCallback((newOpenState) => {
        setIsDialogOpen(newOpenState);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if(reviewId){
            router.delete(route('review.delete', {id: reviewId}));
            setIsDialogOpen(false);
            setReviewId(null);
        }
    }, [reviewId]);

    return (
        <Box>
            <CustomDialog
                title={"レビュー削除"}
                text={"本当に削除しますか？"}
                actionButton={"削除する"}
                buttonColor={"red.400"}
                isDialogOpen={isDialogOpen}
                dialogClose={dialogClose}
                handleSubmit={handleSubmit}
                handleOpenChange={handleOpenChange}
            />
            <ShopData
                detailShopData={"詳細ページの店舗情報"}
                shopName={props.shop.name}
                shopLocate={props.shop.location}
                shopDescription={props.shop.description}
            />
            <HStack mt={10} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Heading as={"h3"} fontSize={"20px"} fontWeight={"bold"}>レビュー一覧</Heading>
                <Link p={2} fontWeight={"600"} bg={"yellow.400"} borderRadius={5} href={route('review.create', {id: props.shop.id})}>レビュー投稿</Link>
            </HStack>
            <Box py={3} spaceY={5}>
                <CardList
                    cardList={"レビューリスト"}
                    shopReviews={props.shop.reviews}
                    dialogOpen={dialogOpen}
                />
            </Box>
        </Box>
    )
}

Detail.layout = (page) => <MainLayout children={page} title={"店舗詳細ページ"} />
export default Detail;
