import ConnectDB from "@/lib/db";
import Image from "next/image";

export default function Home() {
  ConnectDB();
  return <div className="max-w-5xl mx-auto px-9">Home</div>;
}
