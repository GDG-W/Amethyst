import LoginClient from "./client";

export default function Login() {
  return (
    <section className="mt-[6.25rem] flex flex-col items-center">
      <div className="flex w-full flex-col items-center gap-y-6 sm:gap-y-4">
        <div className="text-center">
          <h2 className="label-1 sm:label-0 mb-0.5 text-black">Welcome</h2>
          <p className="label-5 sm:label-4 text-grey-80">Login to view your ticket</p>
        </div>

        <LoginClient />
      </div>
    </section>
  );
}
