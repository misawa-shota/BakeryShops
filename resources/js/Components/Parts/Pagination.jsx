import React from 'react';
import { HStack, Button } from '@chakra-ui/react';
import { router } from '@inertiajs/react';

const Pagination = (props) => {
    const handlePageChange = (url) => {
            router.get(url);
        };

    const getButtonLabel = (label) => {
        if(label.includes("previous")) return "前へ";
        if(label.includes("next")) return "次へ";
        return label;
    };

    return (
        <HStack justifyContent={"center"} alignItems={"center"} mt={5}>
            {props.shopsLinks.map((link, index) => (
                <Button
                    key={index}
                    onClick={() => handlePageChange(link.url)}
                    bg={link.active ? "yellow.500" : "gray.100"}
                    isDisabled={!link.url}
                >
                    {getButtonLabel(link.label)}
                </Button>
            ))}
        </HStack>
    )
}

export default Pagination;
