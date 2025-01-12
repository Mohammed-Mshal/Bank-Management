import { FavoriteAccount } from "@prisma/client";
import { useState } from "react";

export const useFavoriteAccounts=()=>{
     const [favoriteAccounts, setFavoriteAccounts] = useState<FavoriteAccount[]>(
        []
      );
      const [isLoading, setIsLoading] = useState<boolean | null>(null);
      const [error, setError] = useState<boolean | null>(null);
    const getFavoriteAccount = async () => {
        setIsLoading(true);
        const res = await fetch("/api/accounts/favoriteAccounts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setIsLoading(false);
        if (!res.ok) {
          setError(data.message);
          return;
        }
        setFavoriteAccounts(data.data);
    }
    return {favoriteAccounts,isLoading,error,getFavoriteAccount}
}