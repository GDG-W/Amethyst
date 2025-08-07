type ModalProps = {
  title: string;
  summary?: string;
  links?: { id: string; type: "primary" | "secondary"; href: string; text: string }[];
  className?: string;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default ModalProps;
