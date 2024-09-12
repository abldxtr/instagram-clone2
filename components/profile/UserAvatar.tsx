import { Avatar } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import Image from "next/image";

type Props = Partial<AvatarProps> & {
  user: User | undefined;
};

function UserAvatar({ user, ...avatarProps }: Props) {
  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      {user && user.image !== null && user.image !== undefined ? (
        <Image
          src={user.image}
          fill
          alt={`${user?.name}'s profile picture`}
          className="rounded-full object-cover"
        />
      ) : (
        <div className=" absolute inset-0 bg-blue-200/50 " />
      )}
    </Avatar>
  );
}

export default UserAvatar;
