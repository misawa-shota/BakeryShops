import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Box, Heading, HStack, Icon, Image, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const Detail = (props) => {
    return (
        <Box p={3}>
            <Heading my={5} as={"h2"} size={"2xl"} fontSize={"30px"} fontWeight={"bold"}>{props.shop.name}</Heading>
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
            <Heading as={"h3"} fontSize={"20px"} fontWeight={"bold"} mt={10}>レビュー一覧</Heading>
            <Box py={3} spaceY={5}>
                {props.shop.reviews.length > 0 ? (
                    props.shop.reviews.map((review) => (
                        <Box key={review.id} spaceY={3} p={3} borderRadius={"md"} borderWidth={"1px"} borderColor={"gray.500"}>
                            <HStack display={"flex"} alignItems={"center"}>
                                {Array(5).fill("").map((_, i) => (
                                    review.rate > 0 ? (
                                        <Icon key={i} as={FaStar} size={"md"} color={i < review.rate ? "yellow.500" : "gray.500"} />
                                    ) : (
                                        <Icon key={i} as={FaStar} size={"lg"} color={"gray.500"} />
                                    )
                                ))}
                                <Text ml={5}>{review.user.name}さん</Text>
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
