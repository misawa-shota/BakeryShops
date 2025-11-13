import React from 'react';
import { Dialog, Portal, Text, Button } from '@chakra-ui/react';

function CustomDialog(props) {
    return (
        <Dialog.Root open={props.isDialogOpen} onOpenChange={props.handleOpenChange}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{props.title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>{props.text}</Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button p={2} borderRadius={5} bg={"gray.200"} onClick={props.dialogClose}>キャンセル</Button>
                            <Button p={2} borderRadius={5} bg={props.buttonColor} onClick={props.handleSubmit}>{props.actionButton}</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default CustomDialog;
