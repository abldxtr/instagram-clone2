import { Button, ButtonProps } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

function ActionIcon({ children }: Props) {
  return (
    <button type="submit" className="h-9 w-9 flex items-center justify-center ">
      {children}
    </button>
  );
}

export default ActionIcon;
