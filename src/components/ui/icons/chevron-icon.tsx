type Direction = "up" | "down" | "left" | "right";

export const ChevronIcon = ({
  color,
  direction,
  extraClassName,
}: {
  color?: string;
  direction?: Direction;
  extraClassName?: string;
}) => {
  const returnDirectionStyle = (pos?: Direction) => {
    switch (pos) {
      case "up":
        return "rotate-270";
      case "down":
        return "rotate-90";
      case "right":
        return "rotate-180";
      default:
        return null;
    }
  };
  return (
    <svg
      width='6'
      height='10'
      viewBox='0 0 6 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${returnDirectionStyle(direction)} ${extraClassName ? extraClassName : null}`}
    >
      <path
        d='M2.20425 5.00077L5.91675 8.71327L4.85625 9.77377L0.0832486 5.00077L4.85625 0.227774L5.91675 1.28827L2.20425 5.00077Z'
        fill={`${color ? color : "var(--icon-strong-950)"}`}
      />
    </svg>
  );
};
