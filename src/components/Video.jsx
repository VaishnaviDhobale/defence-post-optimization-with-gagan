import { AspectRatio, Box } from "@chakra-ui/react";


export default function video({data}){
    return<>
        <Box
            className="intoVideo"
            h={"490px"}
            margin={"auto"}
            marginBottom={"30px"}
            backgroundColor={"white"}
          >
            {/* <AspectRatio maxW="100%" height="100%" ratio={1}> */}
              <iframe
                src= {data.link}
                width={data.width}
                height={data.height}
                title={data.title}
                style={{width : "100%"}}
              ></iframe>
            {/* </AspectRatio> */}
          </Box>
    </>
}