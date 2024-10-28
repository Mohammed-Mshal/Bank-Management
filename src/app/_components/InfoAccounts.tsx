import React from "react";
import CardInfoAccount from "../_Elements/CardInfoAccount";
import { getDataUser } from "@/action/info";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FormCreateAccount from "./FormCreateAccount";

export default async function InfoAccounts() {
  const dataUser = await getDataUser();

  return (
    <Carousel className="container_info mb-8 w-full">
      <CarouselContent className="flex-1 mx-auto">
        {dataUser?.Account?.map((info) => {
          return (
            <CardInfoAccount
              key={info.id}
              typeValue={"SY"}
              idAccount={info.id}
              balanceAccount={info.balance}
              typeAccount={info.accountType}
              accountStatus={info.accountStatus}
            />
          );
        })}
        <CarouselItem className={`flex`}>
          <Dialog>
            <DialogTrigger
              className="cardInfo min-h-32
              transition-all ease-in-out duration-500 overflow-hidden
              bg-gradient-to-b before:bg-gradient-to-b
              from-gray-600 to-black relative before:absolute before:top-0 before:left-0 before:h-full
              before:w-full before:opacity-0 before:transition-all before:ease-in-out before:duration-500
              before:from-indigo-500 before:to-black hover:before:opacity-100 before:-z-10
              text-white backdrop-blur-lg rounded-2xl xl:basis-1/4 lg:basis-1/3 basis-1/2
              border-gray-800 border-2 cursor-pointer flex items-center justify-center me-4"
            >
              Create Account
            </DialogTrigger>
            <DialogContent className="max-w-[400px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Create Account
                </DialogTitle>
              </DialogHeader>
              <FormCreateAccount />
            </DialogContent>
          </Dialog>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
