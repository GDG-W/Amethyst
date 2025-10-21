import { TSvgExports } from "@/types/icons";
const Upload = ({ width, height }: TSvgExports) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "44"}
    height={height || "44"}
    viewBox="0 0 44 44"
    fill="none"
  >
    <g filter="url(#filter0_dii_9048_1447)">
      <path
        d="M2 9C2 4.58172 5.58172 1 10 1H34C38.4183 1 42 4.58172 42 9V33C42 37.4183 38.4183 41 34 41H10C5.58172 41 2 37.4183 2 33V9Z"
        fill="white"
      />
      <path
        d="M10 1.5H34C38.1421 1.5 41.5 4.85786 41.5 9V33C41.5 37.1421 38.1421 40.5 34 40.5H10C5.85786 40.5 2.5 37.1421 2.5 33V9C2.5 4.85786 5.85786 1.5 10 1.5Z"
        stroke="#FFECC0"
      />
      <path
        d="M31 28V14C31 12.9 30.1 12 29 12H15C13.9 12 13 12.9 13 14V28C13 29.1 13.9 30 15 30H29C30.1 30 31 29.1 31 28ZM18.5 22.5L21 25.51L24.5 21L29 27H15L18.5 22.5Z"
        fill="#F6B51E"
      />
    </g>
    <defs>
      <filter
        id="filter0_dii_9048_1447"
        x="0"
        y="0"
        width="44"
        height="44"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9048_1447" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_9048_1447"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0"
        />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_9048_1447" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="1"
          operator="erode"
          in="SourceAlpha"
          result="effect3_innerShadow_9048_1447"
        />
        <feOffset />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.18 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow_9048_1447"
          result="effect3_innerShadow_9048_1447"
        />
      </filter>
    </defs>
  </svg>
);

export default Upload;
