import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Box, Heading, Field, Textarea, HStack, Icon, VStack, Button } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { router } from '@inertiajs/react';
import CustomDialog from '@/Components/Custom/CustomDialog';

const Edit = (props) => {
    const [rate, setRate] = useState(props.review.rate);
    const [comment, setComment] = useState(props.review.comment);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const review_id = props.review.id;

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const dialogOpen = (e) => {
        e.preventDefault();
        setIsDialogOpen(true);
    };

    const dialogClose = (e) => {
        e.preventDefault();
        setIsDialogOpen(false);
    };

    const handleOpenChange = (newOpenState) => {
        setIsDialogOpen(newOpenState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.patch(route('review.update'), {
            review_id,
            rate,
            comment,
        });
    };

    return (
        <Box>
            <CustomDialog
                title={"レビュー更新"}
                text={"本当に更新しますか？"}
                actionButton={"更新する"}
                buttonColor={"yellow.400"}
                isDialogOpen={isDialogOpen}
                dialogClose={dialogClose}
                handleSubmit={handleSubmit}
                handleOpenChange={handleOpenChange}
            />
            <Heading mb={10} as={"h2"} fontSize={"30px"} fontWeight={"bold"}>レビュー編集</Heading>
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
                        <Button type={"button"} p={3} bg={"yellow.400"} fontWeight={"bold"} borderRadius={5} onClick={dialogOpen}>更新する</Button>
                    </VStack>
                </form>
            </Box>
        </Box>
    )
}

Edit.layout = (page) => <MainLayout children={page} title={"店舗編集ページ"} />
export default Edit
