import { ReactNode } from "react";
import { BiMessage, BiSupport } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdSavings } from "react-icons/md";
import * as motion from "framer-motion/client";
const services: {
  id: string | number;
  imageFeature: string | ReactNode;
  titleFeature: string;
  descriptionFeature: string;
}[] = [
  {
    id: 1,
    imageFeature: <IoLockClosedOutline />,
    titleFeature: "Instant Transfer",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laboriosam incidunt officiis cumque quod voluptatum beatae facilis quo magni laudantium temporibus,",
  },
  {
    id: 2,
    imageFeature: <BsPencil />,
    titleFeature: "Diverse payment Option",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laboriosam incidunt officiis cumque quod voluptatum beatae facilis quo magni laudantium temporibus,",
  },
  {
    id: 3,
    imageFeature: <FaChartLine />,
    titleFeature: "Expense Insight",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laboriosam incidunt officiis cumque quod voluptatum beatae facilis quo magni laudantium temporibus,",
  },
  {
    id: 4,
    imageFeature: <BiMessage />,
    titleFeature: "Personalized Alerts",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laboriosam incidunt officiis cumque quod voluptatum beatae facilis quo magni laudantium temporibus,",
  },
  {
    id: 5,
    imageFeature: <BiSupport />,
    titleFeature: "24/7 Support",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laboriosam incidunt officiis cumque quod voluptatum beatae facilis quo magni laudantium temporibus,",
  },
  {
    id: 6,
    imageFeature: <MdSavings />,
    titleFeature: "Saving Cash",
    descriptionFeature:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laboriosam incidunt officiis cumque quod voluptatum beatae facilis quo magni laudantium temporibus,",
  },
];

export default function OurServices() {
  return (
    <div className="services bg-[var(--dark-violet)]">
      <div className="container max-w-screen-xl mx-auto py-10 px-4">
        <div className="headerServices flex items-center xl:gap-10 md:gap-6 gap-2 flex-col lg:flex-row md:mb-8 lg:mb-16 mb-10">
          <motion.div
            initial={{
              translateX: -100,
              opacity: 0,
            }}
            whileInView={{
              translateX: 0,
              opacity: 1,
            }}
            className="flex-1 w-full lg:w-auto text-white"
          >
            <h3 className="subTitle font-semibold uppercase lg:text-2xl md:text-xl text-lg lg:mb-4 mb-2 relative before:absolute before:h-full before:w-1 before:bg-white ps-4 before:left-0">
              OUR Services
            </h3>
            <h2 className="title xl:text-6xl lg:leading-tight lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold">
              Empowering Financial Control
            </h2>
          </motion.div>
          <motion.div
            initial={{
              translateX: 100,
              opacity: 0,
            }}
            whileInView={{
              translateX: 0,
              opacity: 1,
            }}
            className="flex-1 w-full lg:w-auto"
          >
            <p className="text-gray-400 text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              sed quod est facilis aspernatur excepturi eveniet voluptates
              similique ipsa tempora tempore odit voluptatem temporibus
              veritatis autem saepe pariatur, commodi consequatur.
            </p>
          </motion.div>
        </div>
        <div className="containerCards flex flex-wrap md:justify-between justify-center lg:gap-y-12 gap-y-8 gap-x-8">
          {services.map((service) => {
            return (
              <motion.div
                initial={{
                  translateY: 100,
                  opacity: 0,
                }}
                whileInView={{
                  translateY: 0,
                  opacity: 1,
                }}
                key={service.id}
                className="flex flex-col gap-2 gap-y-4 md:w-1/4 sm:w-1/3 w-full flex-auto text-center items-center sm:text-start sm:items-start"
              >
                <div className="text-white text-4xl">
                  {service.imageFeature}
                </div>
                <h4 className="text-white font-bold lg:text-2xl md:text-text-xl text-lg">
                  {service.titleFeature}
                </h4>
                <p className="text-gray-400 lg:text-lg text-base">
                  {service.descriptionFeature}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
