import { Button } from "antd";
import { Geist, Geist_Mono } from "next/font/google";

export default function Home() {
  return (
    <div>
      <main className="h-screen w-screen flex flex-col gap-[32px] items-center justify-center">
        <Button type="primary">AntDesign</Button>
        <button class="outline-2 outline-offset-2 outline-dotted rounded">
          tailwindcss
        </button>
      </main>
    </div>
  );
}
