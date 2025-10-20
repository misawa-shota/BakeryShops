import { Box, Drawer, Heading, HStack, Icon, Link, Portal, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import { usePage } from '@inertiajs/react';

const MainLayout = ({children}) => {
    const { auth } = usePage().props;

    return (
        <>
            <header>
                {/* Drawer */}
                <Drawer.Root>
                    {/* header */}
                    <Box bg={"yellow.400"} p={3}>
                        <HStack display={"flex"} alignItems={"center"}justifyContent={"space-between"}>
                            <Heading as={"h1"} fontSize={"3xl"}>
                                <Link href={route('shop.index')}>
                                    {import.meta.env.VITE_APP_NAME}
                                </Link>
                            </Heading>
                            <Drawer.Trigger asChild>
                                <Icon as={IoMenu} fontSize={"30px"}></Icon>
                            </Drawer.Trigger>
                        </HStack>
                    </Box>
                    {/* header */}
                    <Portal>
                        <Drawer.Backdrop/>
                        <Drawer.Positioner>
                            <Drawer.Content>
                                <Drawer.Header>
                                    <Drawer.Title>menu</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <VStack>
                                        {auth.user ? (
                                            <>
                                                <Text>こんにちは{auth.user.name}さん</Text>
                                                <Link href={route('dashboard')}>マイページ</Link>
                                                <Link>レビュー投稿</Link>
                                                <Link href={route('logout')}>ログアウト</Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link href={route('login')}>ログイン</Link>
                                                <Link href={route('register')}>新規登録</Link>
                                            </>
                                        )}
                                    </VStack>
                                </Drawer.Body>
                                <Drawer.CloseTrigger asChild>
                                    <Icon as={IoClose} />
                                </Drawer.CloseTrigger>
                            </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
            </header>
            <div>{children}</div>
            <footer>
                <Box bg={"yellow.400"} p={3} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Text>&copy;2025 {import.meta.env.VITE_APP_NAME}</Text>
                </Box>
            </footer>
        </>
    )
};

export default MainLayout
