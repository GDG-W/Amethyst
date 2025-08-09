const Checkmark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M17.089 1.171L7.910 13.265L2.500 7.832L0 10.335L8.333 18.703L20 3.667Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Checkmark;
