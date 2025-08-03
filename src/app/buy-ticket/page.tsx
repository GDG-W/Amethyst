import Breadcrumb from "@/components/ui/breadcrumb";

export default function page() {
  return (
    <div>
      <h1>Hello</h1>
      <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={2} handleClick={() => {}} />
    </div>
  );
}

const breadcrumbList = [
  {
    name: "Home Page",
    link: "/",
  },
  {
    name: "Buy Ticket",
    link: "/buy-ticket",
  },
  {
    name: "Buyer Information",
    link: "/buyer-information",
  },
];
