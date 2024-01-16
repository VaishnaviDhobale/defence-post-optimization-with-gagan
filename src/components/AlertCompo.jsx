import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export function AlertCompo({ data }) {
  return (
    <>
      <Alert status={data.type} style={{ marginTop: "20px" }}>
        <AlertIcon />
        <AlertTitle>{data.msg}</AlertTitle>
      </Alert>
    </>
  );
}
