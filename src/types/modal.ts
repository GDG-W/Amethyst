type SuccessModalProps = {
  currModalState?: boolean;
  title: string;
  summary?: string;
  links?: { id: string; type: "primary" | "secondary"; href: string; text: string }[];
  className?: string;
  toggleModal?: React.Dispatch<React.SetStateAction<boolean>>;
} & React.HTMLAttributes<HTMLDivElement>;

export default SuccessModalProps;
