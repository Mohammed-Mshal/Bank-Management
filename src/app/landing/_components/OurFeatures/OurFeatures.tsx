import Image from "next/image";
import * as motion from "framer-motion/client";
const features: {
  id: string | number;
  imageFeature: string;
  titleFeature: string;
  descriptionFeature: string;
}[] = [
  {
    id: 1,
    imageFeature: "/static/images/sendMoney.png",
    titleFeature: "Send Money",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non reiciendis,",
  },
  {
    id: 2,
    imageFeature: "/static/images/trackExpinsiveMoney.webp",
    titleFeature: "track Expensive Money",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non reiciendis,",
  },
  {
    id: 3,
    imageFeature: "/static/images/paymentMethod.png",
    titleFeature: "Payment Option",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non reiciendis,",
  },
];
export default function OurFeatures() {
  return (
    <div className="features">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-wrap justify-center lg:justify-between py-12 gap-8">
        {features.map((feature) => {
          return (
            <motion.div
              initial={{
                translateY: 100,
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                translateY: 0,
                scale: 1,
                opacity: 1,
              }}
              className="cardFeature flex-1 max-w-sm px-4 py-8 flex flex-col text-center items-center gap-3 border border-1 border-[var(--hard-light-violet)] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              key={feature.id}
            >
              <div className="containerImage h-40 w-60">
                <Image
                  src={feature.imageFeature}
                  alt={feature.titleFeature}
                  height={240}
                  width={160}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-3xl text-[var(--dark-violet)] mb-1">
                {feature.titleFeature}
              </h3>
              <span className="px-4 text-lg">{feature.descriptionFeature}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
