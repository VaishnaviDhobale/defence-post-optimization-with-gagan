import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  HStack,
  VStack
} from '@chakra-ui/react';
import { FaHeading, FaImage, FaCode, FaWindowMaximize } from 'react-icons/fa';

function HTMLPreview({ content }) {
    return (
      <Box p={4} borderWidth={1} borderRadius="md" boxShadow="lg" width={"100%"}>
        <Text fontSize="lg" mb={2} fontWeight={"bold"}>
          Live Preview:
        </Text>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
    );
  }

export function CustomHTMLTagEditor({ onTextareaChange }) {
    let [editorValue,setEditorValue] = useState("")
  const textareaRef = useRef(null);

  const insertTag = (tag) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Get the current cursor position in the textarea.
    const { selectionStart, selectionEnd } = textarea;

    // Insert the HTML tag at the cursor position.
    const textBeforeCursor = textarea.value.substring(0, selectionStart);
    const textAfterCursor = textarea.value.substring(selectionEnd);
    const updatedText = textBeforeCursor+ '\n' + tag + textAfterCursor;

    // Update the textarea value and set the cursor position after the inserted tag.
    textarea.value = updatedText;
    textarea.selectionStart = textarea.selectionEnd = selectionStart + tag.length;

    // Trigger a change event (if needed) to update the React state.
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  };

  let handleTextAreaChange = (e) =>{
    setEditorValue(e.target.value);
    onTextareaChange(e)
  }

  return (
    <Container maxW="container.lg" p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
      {/* <HStack spacing={4} align="flex-start"> */}
        <Box>
          <HStack spacing={4}>
            <Button
              leftIcon={<FaHeading />}
              size="sm"
              onClick={() => insertTag('<Text style = "" ></Text>')}
              colorScheme="teal"
            >
              Text
            </Button>
            <Button
              leftIcon={<FaImage />}
              size="sm"
              onClick={() => insertTag('<Img  style = "" src="" alt="" />')}
              colorScheme="teal"
            >
              Image
            </Button>
            <Button
              leftIcon={<FaCode />}
              size="sm"
              onClick={() => insertTag('<iframe  style = "" src="" frameborder="0"></iframe>')}
              colorScheme="teal"
            >
              IFrame
            </Button>
            <Button
              leftIcon={<FaWindowMaximize />}
              size="sm"
              onClick={() => insertTag('<Box  style = ""></Box>')}
              colorScheme="teal"
            >
              Div
            </Button>
            <Button
              leftIcon={<FaWindowMaximize />}
              size="sm"
              onClick={() => insertTag('<Box  style = " display : flex; gap : 30px"></Box>')}
              colorScheme="teal"
            >
              Flex Div
            </Button>
          </HStack>
        </Box>
        <Box>
          <FormControl>
            <Textarea
              ref={textareaRef}
              id="editor"
              placeholder="Enter content..."
              size="lg"
              minH="200px"
              resize="vertical"
              borderColor="gray.300"
              width={"100%"}
              height={"400px"}
              mt={"30px"}
              onChange={handleTextAreaChange}
              name='content'
            //   value={textareaValue}
            />
          </FormControl>
        </Box>
      {/* </HStack> */}
      <VStack mt={4} spacing={4}>
        <HTMLPreview content={editorValue} />
      </VStack>
    </Container>
  );
}


