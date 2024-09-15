import { auth } from "@/auth";

import { fetchProfile } from "@/lib/data";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;

  //   const profile = await fetchProfile(username);
  const profile = await fetchProfile(username);

  return {
    title: `${profile?.name} (@${profile?.username})`,
  };
}

async function ProfileLayout({ children, params: { username } }: Props) {
  return <div className="bg-black w-full overflow-y-auto  ">{children}</div>;
}

export default ProfileLayout;
