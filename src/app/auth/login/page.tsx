import ButtonLogin from "@/app/_components/ButtonLogin";
import FormLogin from "@/app/_components/FormLogin";
import { getSession } from "@/app/lib/getSession";
import { loginEnum } from "@/enums/loginEnums";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BsGithub, BsGoogle } from "react-icons/bs";

export default async function LoginPage() {
  const session = await getSession();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="login_page overflow-x-hidden relative px-4 flex justify-center items-center min-h-screen min-w-full before:absolute before:top-0 before:left-0 before:h-full before:w-full bg-[#0C0C0C] before:bg-[#1919191f]  before:-z-10 before:backdrop-filter before:backdrop-blur-3xl z-0">
      <div className="bg-[#351560] shadow-2xl shadow-[#060026] -z-20 s absolute lg:h-72 lg:w-72 h-52 w-52 rounded-full -top-10 -start-10"></div>
      <div className="bg-[#351560] shadow-2xl shadow-[#060026] -z-20 s absolute lg:h-72 lg:w-72 h-52 w-52 rounded-full -bottom-10 -end-10"></div>
      <div className="container max-w-md mx-auto px-8 bg-[var(--normal-black)] p-8 rounded-xl">
        <div className="headerForm text-center  text-white mb-8">
          <h2 className="lg:text-4xl md:text-3xl text-2xl mb-2">Golden Bank</h2>
          <p className="md:text-lg text-base">Login To Your Account</p>
        </div>
        <FormLogin />
        <p className="text-gray-400 text-sm text-center">
          Haven&apos;t Account?{"  "}
          <Link href={"/auth/signup"} className="text-white">
            Sing Up
          </Link>
        </p>
        <p className="text-center my-4 relative text-white before:absolute before:w-full before:h-px before:-z-10 z-0  before:bg-white before:left-0 before:top-1/2 before:-translate-y-1/2 ">
          <span className="bg-[var(--normal-black)] px-4">OR</span>
        </p>
        <div className="flex flex-col gap-4">
          <ButtonLogin
            logoButton={<BsGoogle />}
            signinWith={loginEnum.google}
          />
          <ButtonLogin
            logoButton={<BsGithub />}
            signinWith={loginEnum.github}
          />
        </div>
      </div>
    </div>
  );
}
