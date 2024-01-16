import React, { useState } from 'react';
import {
  Box,
  Button,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaTelegram, FaInstagram, } from 'react-icons/fa'; // Import Font Awesome icons
import {AiTwotoneMail} from "react-icons/ai"

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,

} from 'react-share';

export const SharePost = ({ shareUrl, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Popover isOpen={isOpen} onClose={handleClose} placement="top">
        <PopoverTrigger>
          <IconButton
            icon={<Icon as={FaShare} />}
            variant="outline"
            aria-label="Share"
            onClick={handleOpen}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton color={"white"}/>
          <PopoverHeader style={{backgroundColor: "#28a4de",color:"white"}}>Share Post</PopoverHeader>
          <PopoverBody display={"flex"} flexDirection={"column"}>
          <WhatsappShareButton url={shareUrl} title={title}>
              <Box display={"flex"} alignItems={"center"}>
                <FaWhatsapp color='#25D366' fontSize={"22px"} />
              <Button variant="ghost">
                WhatsApp
              </Button>
              </Box>
            </WhatsappShareButton>
            <TelegramShareButton url={shareUrl} title={title}>
               <Box display={"flex"} alignItems={"center"}>
               <FaTelegram color='#0088cc' fontSize={"22px"}/>
              <Button variant="ghost">
                Telegram
              </Button>
               </Box>
            </TelegramShareButton>
            <TwitterShareButton url={shareUrl} title={title} >
             <Box display={"flex"} alignItems={"center"}>
             <FaTwitter color='#1D9BF0' fontSize={"22px"}/>
              <Button variant="ghost">
                Twitter
              </Button>
             </Box>
            </TwitterShareButton>
            <FacebookShareButton url={shareUrl} quote={title}>
               <Box display={"flex"} alignItems={"center"}>
               <FaFacebook color='#1877F2' fontSize={"22px"} />
              <Button variant="ghost">
                Facebook
              </Button>
               </Box>
            </FacebookShareButton>
            <EmailShareButton url={shareUrl} title={title}>
               <Box display={"flex"} alignItems={"center"}>
               <AiTwotoneMail color='#f2c565' fontSize={"22px"}/>
              <Button variant="ghost">
                Email
              </Button>
               </Box>
            </EmailShareButton>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

