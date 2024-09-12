import { Button, ButtonProps } from "@/components/ui/button";

// type Props = Partial<ButtonProps> & {
//   children: React.ReactNode;
// };

type Props = {
  children: React.ReactNode;
};

function ActionIcon({ children }: Props) {
  return (
    <button
      // type="submit"
      type="submit"
      // variant={"ghost"}
      // size={"icon"}
      className="h-9 w-9 flex items-center justify-center "
      // {...buttonProps}
    >
      {children}
    </button>
  );
}

export default ActionIcon;
