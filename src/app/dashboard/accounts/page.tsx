import AccountsList from "@/app/_components/AccountsList";
import AsideFriends from "@/app/_components/AsideFriends";

export default function Accounts() {
  return (
    <div className="accounts_wrapper flex py-4 px-3 gap-12 relative overflow-visible">
      <AccountsList />
      <AsideFriends />
    </div>
  );
}
