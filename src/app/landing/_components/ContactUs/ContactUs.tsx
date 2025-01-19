import * as motion from "framer-motion/client";

export default function ContactUs() {
  return (
    <div className="bg-white">
      <div className="container max-w-screen-xl mx-auto px-4 py-10 flex items-center">
        <div className="flex items-center xl:gap-10 md:gap-6 gap-2 gap-y-4 flex-col lg:flex-row md:mb-8">
          <motion.div
            initial={{
              translateX: -100,
              opacity: 0,
            }}
            whileInView={{
              translateX: 0,
              opacity: 1,
            }}
            className="flex-1 w-full lg:w-auto text-[var(--dark-violet)]"
          >
            <h3 className="subTitle font-semibold uppercase text-[#060026] lg:text-2xl md:text-xl text-lg lg:mb-4 mb-2 relative before:absolute before:h-full before:w-1 before:bg-[#7456EC] ps-4 before:left-0">
              Contact Us
            </h3>
            <h2 className="title xl:text-6xl lg:leading-tight lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold md:text-balance md:mb-6 mb-2 text-[#060026]">
              If You Have Any Question Fill This Form To Contact Us
            </h2>
            <p className="text-[#060026af] text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              sed quod est facilis aspernatur excepturi eveniet voluptates
              similique ipsa tempora tempore odit voluptatem temporibus
              veritatis autem saepe pariatur, commodi consequatur.
            </p>
          </motion.div>
          <motion.form
            initial={{
              translateX: 100,
              opacity: 0,
            }}
            whileInView={{
              translateX: 0,
              opacity: 1,
            }}
            className="flex-1 w-full lg:w-auto flex flex-wrap justify-between gap-y-4"
          >
            <div className="containerInput flex flex-col sm:w-[calc(100%/2-20px)] w-full">
              <label htmlFor="name" className="text-sm ps-4 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your First Name"
                className="text-lg  border-1 border-[#0600266f] p-2 px-4 rounded-lg outline-none bg-transparent text-black"
              />
            </div>
            <div className="containerInput flex flex-col sm:w-[calc(100%/2-20px)] w-full">
              <label htmlFor="name" className="text-sm ps-4 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Last Name"
                className="text-lg  border-1 border-[#0600266f] p-2 px-4 rounded-lg outline-none bg-transparent text-black"
              />
            </div>
            <div className="containerInput flex flex-col sm:w-[calc(100%/2-20px)] w-full">
              <label htmlFor="email" className="text-sm ps-4 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="text-lg  border-1 border-[#0600266f] p-2 px-4 rounded-lg outline-none bg-transparent text-black"
              />
            </div>
            <div className="containerInput flex flex-col sm:w-[calc(100%/2-20px)] w-full">
              <label htmlFor="subject" className="text-sm ps-4 mb-1">
                Your Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter Your Subject"
                className="text-lg  border-1 border-[#0600266f] p-2 px-4 rounded-lg outline-none bg-transparent text-black"
              />
            </div>
            <div className="containerInput flex flex-col w-full">
              <label htmlFor="message" className="text-sm ps-4 mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Enter Your Subject"
                className="
              text-lg  border-1 border-[#0600266f] p-2 px-4 rounded-lg outline-none bg-transparent text-black resize-none h-40"
              ></textarea>
            </div>
            <button 
                  name='Submit' className="text-lg w-32 py-2 bg-[var(--normal-violet)] text-white rounded-xl transition-all hover:shadow-md hover:shadow-violet-300 duration-500">
              Submit
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
