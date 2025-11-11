import React, { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Box, Heading, HStack, Icon, Image, Text, Link, Button, Dialog, Portal } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { toaster } from '../../../../src/components/ui/toaster';
import { usePage, router } from '@inertiajs/react';

const Detail = (props) => {
    const { auth } = usePage().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [reviewId, setReviewId] = useState(null);

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

    const dialogOpen = (id) => {
        setReviewId(id);
        setIsDialogOpen(true);
    };

    const dialogClose = (e) => {
        e.preventDefault();
        setIsDialogOpen(false);
    };

    const deleteReview = () => {
        if(reviewId){
            router.delete(route('review.delete', {id: reviewId}));
            setIsDialogOpen(false);
            setReviewId(null);
        }
    };

    return (
        <Box>
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>レビュー削除</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Text>本当に削除しますか?</Text>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button p={2} borderRadius={5} bg={"gray.200"} onClick={dialogClose}>キャンセル</Button>
                                <Button p={2} borderRadius={5} bg={"red.400"} onClick={deleteReview}>削除する</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
            <Heading my={5} as={"h2"} fontSize={"30px"} fontWeight={"bold"}>{props.shop.name}</Heading>
            <HStack display={"flex"} alignItems={"center"} spaceX={5}>
                <Image src={"https://placehold.jp/150x150.png"} width={"300px"} />
                <Box spaceY={5}>
                    <Box>
                        <Text fontWeight={"bold"}>所在地</Text>
                        <Text>{props.shop.location}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={"bold"}>店舗情報</Text>
                        <Text>{props.shop.description}</Text>
                    </Box>
                </Box>
            </HStack>
            <HStack mt={10} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Heading as={"h3"} fontSize={"20px"} fontWeight={"bold"}>レビュー一覧</Heading>
                <Link p={2} fontWeight={"600"} bg={"yellow.400"} borderRadius={5} href={route('review.create', {id: props.shop.id})}>レビュー投稿</Link>
            </HStack>
            <Box py={3} spaceY={5}>
                {props.shop.reviews.length > 0 ? (
                    props.shop.reviews.map((review) => (
                        <Box key={review.id} spaceY={3} p={3} borderRadius={"md"} borderWidth={"1px"} borderColor={"gray.500"}>
                            <HStack justifyContent={"space-between"}>
                                <HStack display={"flex"} alignItems={"center"}>
                                    {Array(5).fill("").map((_, i) => (
                                        review.rate > 0 ? (
                                            <Icon key={i} as={FaStar} size={"md"} color={i < review.rate ? "yellow.500" : "gray.500"} />
                                        ) : (
                                            <Icon key={i} as={FaStar} size={"md"} color={"gray.500"} />
                                        )
                                    ))}
                                    <Text ml={5}>{review.user.name}さん</Text>
                                </HStack>
                                {
                                    auth.user && auth.user.id === review.user.id && (
                                        <HStack spaceX={3}>
                                            <Link href={route('review.edit', {id: review.id})} borderRadius={5} bg={"yellow.400"} p={2}>編集</Link>
                                            <Button onClick={() => dialogOpen(review.id)} borderRadius={5} bg={"red.400"} p={2}>削除</Button>
                                        </HStack>
                                    )
                                }
                            </HStack>
                            <Text>{review.comment}</Text>
                        </Box>
                    ))
                ) : (
                    <Text>レビューはまだありません</Text>
                )}
            </Box>
        </Box>
    )
}

Detail.layout = (page) => <MainLayout children={page} title={"店舗詳細ページ"} />
export default Detail;
