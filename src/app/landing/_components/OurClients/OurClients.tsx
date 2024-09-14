import * as motion from "framer-motion/client";
import Image from "next/image";
import "./OurClient.css";
const companiesList: {
  id: string | number;
  nameCompany: string;
  logoCompany: string;
}[] = [
  {
    id: 1,
    nameCompany: "Logoipsum",
    logoCompany: "/static/images/logoCompany1.svg",
  },
  {
    id: 2,
    nameCompany: "Logoipsum",
    logoCompany: "/static/images/logoCompany2.svg",
  },
  {
    id: 3,
    nameCompany: "Logoipsum",
    logoCompany: "/static/images/logoCompany1.svg",
  },
  {
    id: 4,
    nameCompany: "Logoipsum",
    logoCompany: "/static/images/logoCompany2.svg",
  },
];
const variant: {
  start: {
    scale: number;
  };
  end: {
    scale: number;
  };
} = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
  },
};
export default function OurClients() {
  return (
    <div className="our_customer">
      <div className="container max-w-screen-xl mx-auto flex justify-center flex-wrap gap-8 py-8 px-4">
        {companiesList.map((company) => {
          return (
            <motion.div
              variants={variant}
              initial={"start"}
              whileInView={"end"}
              transition={{
                duration: 0.5,
              }}
              key={company.id}
              className="flex flex-col gap-4 flex-1 max-w-sm min-w-72 items-center"
            >
              <div className="containerImage">
                <Image
                  alt={company.nameCompany}
                  src={company.logoCompany}
                  height={120}
                  width={120}
                  className="object-cover"
                />
              </div>
              <span className="text-3xl font-bold text-[#060026ea]">
                {company.nameCompany}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
