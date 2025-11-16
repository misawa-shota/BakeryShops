import React, { memo } from 'react';
import StarRating from '../Parts/StarRating';
import { usePage } from '@inertiajs/react';
import { Box, HStack, Text, Link, Button } from '@chakra-ui/react';

const ReviewCard = memo((props) => {
    const { auth } = usePage().props;
    console.log("ReviewCard.jsx レンダリング");
    return (
        <Box key={props.review.id} spaceY={3} p={3} borderRadius={"md"} borderWidth={"1px"} borderColor={"gray.500"}>
            <HStack justifyContent={"space-between"}>
                <HStack display={"flex"} alignItems={"center"}>
                    <StarRating reviewRate={props.review.rate} />
                    <Text ml={5}>{props.review.user.name}さん</Text>
                </HStack>
                {
                    auth.user && auth.user.id === props.review.user.id && (
                        <HStack spaceX={3}>
                            <Link href={route('review.edit', {id: props.review.id})} borderRadius={5} bg={"yellow.400"} p={2}>編集</Link>
                            <Button onClick={() => props.dialogOpen(props.review.id)} borderRadius={5} bg={"red.400"} p={2}>削除</Button>
                        </HStack>
                    )
                }
            </HStack>
            <Text>{props.review.comment}</Text>
        </Box>
    )
});

export default ReviewCard;
