import { auth } from "@/auth";
import SignUpForm from "@/components/auth/signup-form";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const user = await auth();
  console.log("user", user);

  // if (user) {
  //   redirect("/login");
  // }
  return (
    <div className="">
      <SignUpForm />
    </div>
  );
}
