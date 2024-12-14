import React from "react";

export default function TitleSection({
  markerWord,
  normalWord,
}: {
  markerWord?: string;
  normalWord: string;
}) {
  return (
    <h3 className="titleAccounts text-2xl font-bold">
      {markerWord && <span className="text-indigo-600">{markerWord}</span>}{" "}
      {normalWord}
    </h3>
  );
}
