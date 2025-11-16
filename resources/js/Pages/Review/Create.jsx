import React, { useCallback, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Box, Heading, Field, Textarea, HStack, Icon, VStack, Button } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { router } from '@inertiajs/react';
import CustomDialog from '@/Components/Parts/CustomDialog';

const Create = (props) => {
    const [rate, setRate] = useState(1);
    const [comment, setComment] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const shop_id = props.shop.id;
    console.log("Create.jsx レンダリング");

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const dialogOpen = useCallback((e) => {
        e.preventDefault();
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
        router.post(route('review.store'), {
            shop_id,
            rate,
            comment,
        });
    }, []);

    return (
        <Box>
            <CustomDialog
                title={"レビュー投稿"}
                text={"本当に投稿しますか？"}
                actionButton={"投稿する"}
                buttonColor={"yellow.400"}
                isDialogOpen={isDialogOpen}
                dialogClose={dialogClose}
                handleSubmit={handleSubmit}
                handleOpenChange={handleOpenChange}
            />
            <Heading mb={10} as={"h2"} fontSize={"30px"} fontWeight={"bold"}>レビュー作成</Heading>
            <Box bg={"gray.100"} p={2}>
                <form>
                    <VStack gap={10}>
                        <Field.Root>
                            <Field.Label fontSize={"20px"}>評価</Field.Label>
                            <HStack display={"flex"} alignItems={"center"}>
                                {Array(5).fill("").map((_, i) => (
                                    <Icon key={i} as={FaStar} size={"lg"} cursor={"pointer"} color={i < rate ? "yellow.500" : "gray.500"} onClick={() => setRate(i + 1)} />
                                ))}
                            </HStack>
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label fontSize={"20px"}>コメント記入欄</Field.Label>
                            <Textarea name={"comment"} id={"comment"} value={comment} onChange={handleChange} />
                        </Field.Root>
                        <Button type={"button"} p={3} bg={"yellow.400"} fontWeight={"bold"} borderRadius={5} onClick={dialogOpen}>投稿する</Button>
                    </VStack>
                </form>
            </Box>
        </Box>
    )
}

Create.layout = (page) => <MainLayout children={page} title={"店舗作成ページ"} />
export default Create
