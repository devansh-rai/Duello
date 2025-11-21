import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { fetchClash } from "@/app/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
import AddClashItems from "@/components/clash/AddClashItems";
import ViewClashItems from "@/components/clash/ViewClashItems";
import { getServerSession } from "next-auth";
import React from "react";

export default async function clashItems({
  params,
}: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const session: CustomSession | null = await getServerSession(authOptions);
  const clash: ClashType | null = await fetchClash(id,session?.user?.token!);
  return (
    <div className="container">
      <Navbar />
      <div className="mt-8 mx-10">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg">{clash?.description}</p>
        {clash?.ClashItem && clash.ClashItem.length > 0 ? (
          <ViewClashItems clash={clash} />
        ) : (
          <AddClashItems
            token={session?.user?.token!}
            // clashId={params?.id.toString()}
            clashId={id.toString()}
          />
        )}
      </div>

    </div>
  );
}
