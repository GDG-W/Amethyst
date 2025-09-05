import TiltedCard from "./tilted-card";

interface CardData {
  title: string;
  text: string;
  icon: string;
  backgroundColor: string;
  tilt: string;
  marginTop?: string;
}

interface TiltedCardsGridProps {
  cards: CardData[];
}

export default function TiltedCardsGrid({ cards }: TiltedCardsGridProps) {
  return (
    <>
      <style jsx global>{`
        @keyframes drop-in {
          0% {
            opacity: 0;
            transform: translateY(-100px) rotate(0deg);
          }
          70% {
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-drop-in {
          animation: drop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <TiltedCard
            key={index}
            title={card.title}
            text={card.text}
            icon={card.icon}
            backgroundColor={card.backgroundColor}
            tilt={card.tilt}
            marginTop={card.marginTop}
            animationDelay={index * 150}
          />
        ))}
      </div>
    </>
  );
}
