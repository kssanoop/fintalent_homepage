import newimg from "@/public/section444.png";
import CountUp from "react-countup";

const CountUpBand = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${newimg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        width: "100%",
        minHeight: "400px",
        minWidth: "100%",
      }}
      className="flex   w-screen items-center justify-center overflow-hidden"
    >
      <div className=" my-[70px] grid grid-cols-1 gap-[47px] text-white sm:grid-cols-2 lg:grid-cols-3 ">

        {/* Retention */}
        <div>
          <span className="flex justify-center gap-2 text-[36px] font-[800] md:text-[48px]">
            <CountUp
              enableScrollSpy
              scrollSpyDelay={5}
              delay={3000}
              duration={5}
              end={93}
            />
            <h2>%</h2>
          </span>
          <p className="text-center">Retention Rate</p>
        </div>

        {/* Recruiter */}
        <div>
          <span className="flex justify-center gap-2 text-[36px] font-[800] md:text-[48px]">
            <h2>+</h2>

            <CountUp
              enableScrollSpy
              scrollSpyDelay={5}
              delay={3000}
              duration={5}
              end={90}
            />
            <h2>%</h2>
          </span>
          <p className="text-center">Recruiter Productivity</p>
        </div>

        {/* Recruitment */}
        <div>
          <span className="flex justify-center gap-2 text-[36px] font-[800] md:text-[48px]">
            <h1>-</h1>

            <CountUp
              enableScrollSpy
              scrollSpyDelay={5}
              delay={3000}
              duration={5}
              end={50}
            />
            <h2>%</h2>
          </span>
          <p className="text-center">Recruitment Time</p>
        </div>


        <div className="px-8">
          <span className="flex justify-center gap-2 text-[36px] font-[800] md:text-[48px]">
            <h2>{"<"}</h2>

            <CountUp
              enableScrollSpy
              scrollSpyDelay={5}
              delay={3000}
              duration={5}
              end={5}
            />

            <h2>Days</h2>
          </span>
          <p className="text-center">Turn Around Time</p>
        </div>

        {/* Hiring Partners */}
        <div>
          <span className="flex  items-center justify-center gap-2  text-[36px] font-[800] md:text-[48px]">
            <CountUp
              enableScrollSpy
              scrollSpyDelay={5}
              delay={3000}
              duration={5}
              end={50}
            />
            <h2>+</h2>
          </span>
          <p className="text-center">Hiring Partners</p>
        </div>

        {/* Offer Acceptance */}
        <div>
          <span className="flex justify-center gap-2 text-[36px] font-[800] md:text-[48px]">
            <CountUp
              enableScrollSpy
              scrollSpyDelay={5}
              delay={3000}
              duration={5}
              end={90}
            />
            <h2>%</h2>
          </span>
          <p className="text-center">Offer Acceptance</p>
        </div>





      </div>
    </div>
  );
};

export default CountUpBand;
