import ConnectDB from "@/lib/db";

export default async function Home() {
  await ConnectDB();

  return <div className="max-w-5xl mx-auto px-9">Home</div>;
}
