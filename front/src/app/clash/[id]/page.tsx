import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchClash } from "@/app/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
import Clashing from "@/components/clash/Clashing";
import { checkDateExpiry } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

export default async function clashItems({ 
  params,
}: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const session: CustomSession | null = await getServerSession(authOptions);
  const clash: ClashType | null = await fetchClash(id,session?.user?.token!);

  if (!clash) return notFound();
  if (checkDateExpiry(clash.expire_at)) {
    return notFound();
  }
  return (
    <div className="container">
      <Navbar />
      <div className="mt-4 mx-10">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg">{clash?.description}</p>
        <Clashing clash={clash!} />
      </div>

    </div>
  );
}
