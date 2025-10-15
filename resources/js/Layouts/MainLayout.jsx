import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <>
            <header>
                <Box bg={"yellow.400"} p={3}>
                    <HStack>
                        <Heading>{import.meta.env.VITE_APP_NAME}</Heading>
                    </HStack>
                </Box>
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
