import Image from "next/image";

interface TiltedCardProps {
  title: string;
  text: string;
  icon: string;
  backgroundColor: string;
  tilt: string | number;
  marginTop?: string;
  animationDelay?: number;
}

export default function TiltedCard({
  title,
  text,
  icon,
  backgroundColor,
  tilt,
  marginTop,
  animationDelay = 0,
}: TiltedCardProps) {
  const rotationStyle = typeof tilt === "number" ? { transform: `rotate(${tilt}deg)` } : {};
  const rotationClass = typeof tilt === "string" ? tilt : "";

  return (
    <div
      className={`relative h-[16.875rem] rounded-[1rem] px-5 py-8 ${backgroundColor} ${rotationClass} animate-drop-in`}
      style={{
        ...rotationStyle,
        ...(marginTop && { marginTop }),
        animationDelay: `${animationDelay}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white">
        <Image src={icon} alt="Card icon" width={24} height={24} />
      </div>

      <div className="flex w-full max-w-[14rem] flex-col gap-4">
        <h2 className="text-[1.68rem] leading-[1] font-medium text-[#171717]">{title}</h2>
        <p className="label-3 text-[#5C5C5C]">{text}</p>
      </div>
    </div>
  );
}
