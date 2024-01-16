// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Navbar } from "./Navbar";
// import { Box, Button, Spinner } from "@chakra-ui/react";
// import { Spinar } from "./Spinar";
// import { YourPDFComponent } from "./YourPDFComponent";

// const PdfViewer = () => {
//   const { link } = useParams();
//   const [isLoading, setIsLoading] = useState(true);

//   const handleIframeLoad = () => {
//     // This function will be called when the iframe has finished loading
//     setIsLoading(false);
//   };

//   const handleFullScreen = () => {
//     const iframe = document.getElementById("pdfIframe");

//     if (iframe) {
//       if (iframe.requestFullscreen) {
//         iframe.requestFullscreen();
//       } else if (iframe.mozRequestFullScreen) {
//         iframe.mozRequestFullScreen();
//       } else if (iframe.webkitRequestFullscreen) {
//         iframe.webkitRequestFullscreen();
//       } else if (iframe.msRequestFullscreen) {
//         iframe.msRequestFullscreen();
//       }
//     }
//   };

//   return (
//     <>
//       {/* <Navbar /> */}
//       <Box
//         display={"flex"}
//         flexDirection="column"
//         alignItems="center"
//         mt={"-50px"}
//         position={"relative"}
//       >
//         {isLoading && (
//           <Spinar position="absolute" right="0px" top="40px" color="white" />
//         )}
//         <Button
//           onClick={handleFullScreen}
//           variant="outline"
//           mb={4}
//           position={"absolute"}
//           right="0px"
//           top={"12px"}
//           color={"white"}
//           bg={"#313131"}
//           zIndex={1000}
//         >
//           Fullscreen
//         </Button>
//         <iframe
//           id="pdfIframe"
//           title="PDF Viewer"
//           src={
//             link.includes("drive")
//               ? `${decodeURIComponent(link)}`
//               : `https://www.youtube.com/embed/${decodeURIComponent(link)}`
//           }
//           sandbox="allow-same-origin allow-scripts allow-popups"
//           width={"100%"}
//           height={"800px"}
//           allowFullScreen
//           frameborder="0"
//           onLoad={handleIframeLoad}
//         >
//           iframe
//         </iframe>
//         {/* <YourPDFComponent/> */}
//       </Box>
//     </>
//   );
// };

// export default PdfViewer;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { Spinar } from "./Spinar";
import { Navbar } from "./Navbar";

const PdfViewer = () => {
  const { link } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleFullScreen = () => {
    const iframe = document.getElementById("pdfIframe");

    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt="-50px"
        position="relative"
      >
        {isLoading && (
          <Spinar position="absolute" right="0px" top="40px" color="white" />
        )}
        <Button
          onClick={handleFullScreen}
          variant="outline"
          mb={4}
          position="absolute"
          right="0px"
          top="12px"
          color="white"
          bg="#313131"
          zIndex={1000}
        >
          Fullscreen
        </Button>
        <iframe
          title="PDF Viewer"
          src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(link)}`}
          width="100%"
          height="800px"
          allowFullScreen
          frameborder="0"
          onLoad={handleIframeLoad}
        >
          iframe
        </iframe>
      </Box>
    </>
  );
};

export default PdfViewer;
