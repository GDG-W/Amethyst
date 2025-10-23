import DevfestLogo from "@/components/icons/devfestlogo-icon";

const Logo = () => {
  return (
    <div className="z-[1] mt-6 flex h-[25px] items-center gap-[2px] rounded-full border border-[#EBEBEB] bg-white p-[23px]">
      <DevfestLogo />
      <p className="font-inter text-[15.77px] leading-none font-bold text-[#1e1e1e]">
        DevFest Lagos
      </p>
    </div>
  );
};

export default Logo;
