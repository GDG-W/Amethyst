import { TSvgExports } from "@/types/icons";

const X = ({ width, height }: TSvgExports) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "32"}
    height={height || "30"}
    viewBox="0 0 32 30"
    fill="none"
  >
    <path
      d="M25.2 0.498047H30.1074L19.3874 12.7815L32 29.4992H22.1257L14.3863 19.362L5.54057 29.4992H0.628571L12.0937 16.3563L0 0.500333H10.1257L17.1109 9.76433L25.2 0.498047ZM23.4743 26.5552H26.1943L8.64 3.2889H5.72343L23.4743 26.5552Z"
      fill="black"
    />
  </svg>
);

export default X;
