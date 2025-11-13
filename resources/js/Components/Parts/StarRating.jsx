import React from 'react';
import { Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

function StarRating(props) {
    return (
        <>
            {Array(5).fill("").map((_, i) => (
                props.reviewRate > 0 ? (
                    <Icon key={i} as={FaStar} size={"md"} color={i < props.reviewRate ? "yellow.500" : "gray.500"} />
                ) : (
                    <Icon key={i} as={FaStar} size={"md"} color={"gray.500"} />
                )
            ))}
        </>
    )
}

export default StarRating
