import Button from "../button";
import "./tab.css";

type TabProps = {
  tabs: Record<"name" | "label", string>[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function Tab({ tabs, activeTab, setActiveTab }: TabProps) {
  return (
    <div className="bg-faded-lighter flex w-full items-center gap-2.5 rounded-[100px] p-1 md:max-w-[520px]">
      {tabs.map((tab) => (
        <Button
          key={tab.name}
          size="full"
          data-active={tab.name === activeTab ? activeTab : undefined}
          variant="ghost"
          onClick={() => setActiveTab(tab.name)}
          className="label-3 relative z-0 text-nowrap"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
