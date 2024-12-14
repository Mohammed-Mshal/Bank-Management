import React from "react";
import TitleSection from "../_Elements/TitleSection";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const listFriends = [
  {
    id: "0",
    name: "Mohammed Al-Mashal",
    imgProfile: "/static/images/profileImage.jpg",
  },
  {
    id: "1",
    name: "Mohammed Al-Mashal",
    imgProfile: "/static/images/profileImage.jpg",
  },
  {
    id: "2",
    name: "Mohammed Al-Mashal",
    imgProfile: "/static/images/profileImage.jpg",
  },
  {
    id: "3",
    name: "Mohammed Al-Mashal",
    imgProfile: "/static/images/profileImage.jpg",
  },
  {
    id: "4",
    name: "Mohammed Al-Mashal",
    imgProfile: "/static/images/profileImage.jpg",
  },
  {
    id: "5",
    name: "Mohammed Al-Mashal",
    imgProfile: "/static/images/profileImage.jpg",
  },
];

export default function AsideFriends() {
  return (
    <ScrollArea className="aside-friends hidden xl:block flex-auto max-h-[400px] w-full max-w-sm bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl sticky top-10 overflow-y-auto">
      <div className="headerFriends sticky top-0 bg-[#1A1A1A] px-4 py-4">
        <TitleSection normalWord="Friends" />
      </div>
      {listFriends?.length > 0 ? (
        <ul className="listFriends px-4 pb-4 flex flex-col gap-4">
          {listFriends.map((friend) => {
            return (
              <li key={friend?.id} className="flex gap-2 items-center">
                <div className="containerImage">
                  <Image
                    src={friend?.imgProfile}
                    alt="User"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div className="containerInfo flex-1 flex flex-col gap-2">
                  <h4>{friend?.name}</h4>
                  <div className="containerBTN flex gap-2">
                    <Link
                      href={`/customers/${friend?.id}`}
                      className="bg-indigo-600 hover:bg-indigo-900 transition-all py-1 flex-1 flex justify-center items-center rounded-lg"
                    >
                      View Profile
                    </Link>
                    <button className="border border-indigo-600 hover:border-indigo-800 hover:bg-indigo-900 transition-all py-1 flex-1 flex justify-center items-center rounded-lg">
                      Send Money
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h5>Don`t Have Any Friends</h5>
      )}
    </ScrollArea>
  );
}
