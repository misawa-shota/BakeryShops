import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Box, Heading, Field, Textarea, HStack, Icon, VStack, Button, Dialog, Portal, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { router } from '@inertiajs/react';

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
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>レビュー更新</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Text>本当に更新しますか?</Text>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button p={2} borderRadius={5} bg={"gray.200"} onClick={dialogClose}>キャンセル</Button>
                                <Button p={2} borderRadius={5} bg={"yellow.400"} onClick={handleSubmit}>更新する</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
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
