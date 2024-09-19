import { signIn } from "@/auth";
import { loginEnum } from "@/enums/loginEnums";

export default function ButtonLogin({
  signinWith,
  logoButton,
}: {
  signinWith: loginEnum;
  logoButton: React.ReactNode;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(signinWith, {
          redirect: true,
          redirectTo:'/'
        });
      }}
    >
      <button className="py-2 w-full bg-white flex justify-center items-center gap-2 rounded-lg duration-500 transition-all hover:shadow-gray-600 hover:shadow-lg">
        {logoButton} Login With {signinWith.toUpperCase()}
      </button>
    </form>
  );
}
