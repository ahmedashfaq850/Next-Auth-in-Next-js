import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return <div className="max-w-5xl mx-auto px-9">Dashboard</div>;
};

export default Dashboard;
