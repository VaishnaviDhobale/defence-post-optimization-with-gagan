import React from "react";
import { Box, CSSReset } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const upper = keyframes`
  50% {
    top: 25px;
  }
`;

const right = keyframes`
  50% {
    right: 25px;
  }
`;

const left = keyframes`
  50% {
    left: 25px;
  }
`;
const lower = keyframes`
  50% {
    bottom: 25px;
  }
`;
const styles = {
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    width: "100%",
    height: "100vh",
  },
  loader: {
    width: "25px",
    height: "25px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    position: "absolute",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
  },
  upper: {
    top: "-25px",
    background: "#2da2ff",
    animation: `${upper} 1s infinite`,
  },
  right: {
    right: "-25px",
    background: "#ff337a",
    animation: `${right} 1s infinite`,
  },
  lower: {
    bottom: "-25px",
    background: "#ffff00",
    animation: `${lower} 1s infinite`,
  },
  left: {
    left: "-25px",
    background: "#00ff00",
    animation: `${left} 1s infinite`,
  },
};

export function Spinar() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="60vh"
    >
      <Box as="div" css={styles.loader} >
      <Box as="span" css={[styles.ball, styles.upper]} />
      <Box as="span" css={[styles.ball, styles.right]} />
      <Box as="span" css={[styles.ball, styles.lower]} />
      <Box as="span" css={[styles.ball, styles.left]} />
    </Box>
      {/* <div className="loader">
        <div className="book-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 126 75"
            className="book"
          >
            <rect
              stroke-width="5"
              stroke="#e05452"
              rx="7.5"
              height="70"
              width="121"
              y="2.5"
              x="2.5"
            ></rect>
            <line
              stroke-width="5"
              stroke="#e05452"
              y2="75"
              x2="63.5"
              x1="63.5"
            ></line>
            <path
              stroke-linecap="round"
              stroke-width="4"
              stroke="#c18949"
              d="M25 20H50"
            ></path>
            <path
              stroke-linecap="round"
              stroke-width="4"
              stroke="#c18949"
              d="M101 20H76"
            ></path>
            <path
              stroke-linecap="round"
              stroke-width="4"
              stroke="#c18949"
              d="M16 30L50 30"
            ></path>
            <path
              stroke-linecap="round"
              stroke-width="4"
              stroke="#c18949"
              d="M110 30L76 30"
            ></path>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff74"
            viewBox="0 0 65 75"
            className="book-page"
          >
            <path
              stroke-linecap="round"
              stroke-width="4"
              stroke="#c18949"
              d="M40 20H15"
            ></path>
            <path
              stroke-linecap="round"
              stroke-width="4"
              stroke="#c18949"
              d="M49 30L15 30"
            ></path>
            <path
              stroke-width="5"
              stroke="#e05452"
              d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
            ></path>
          </svg>
        </div>
      </div> */}
    </Box>
  );
}
