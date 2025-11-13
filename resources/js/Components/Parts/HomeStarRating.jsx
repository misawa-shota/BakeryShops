import { HStack, Icon, Box } from '@chakra-ui/react';
import React from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({rating, percentage, totalStars = 5, ...props}) {
    return (
        <HStack spacing={1}>
            {Array(totalStars).fill("").map((_, i) => {
                const starIndex = i + 1;
                const rate = rating;
                const ratePercent = percentage;

                if (rate >= starIndex) {
                    return (
                        <Icon key={i} as={FaStar} size={"lg"} color={"yellow.500"} {...props} />
                    );
                } else if (rate > starIndex - 1) {
                    return (
                        <Box key={i} position={"relative"} justifyContent={"center"} display={"flex"}>
                            <Icon as={FaStar} size={"lg"} color={"yellow.500"} style={{clipPath: `polygon(0 0, ${ratePercent}% 0, ${ratePercent}% 100%, 0 100%)`, position: "absolute", zIndex: 1}} />
                            <Icon as={FaStar} size={"lg"} color={"gray.500"} />
                        </Box>
                    );
                } else {
                    return (
                        <Icon key={i} as={FaStar} size={"lg"} color={"gray.500"} {...props}/>
                    );
                }
            })}
        </HStack>
    );
};

export default StarRating;
