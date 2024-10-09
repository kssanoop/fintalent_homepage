/* eslint-disable prettier/prettier */
import Link from "next/link"
import Image from "next/image"
import footerlogo from "@/public/logoWhite.svg"
import fb from "@/public/footerSVGs/facebook.svg"
import ig from "@/public/footerSVGs/instagram.svg"
import linkedin from "@/public/footerSVGs/linkedin.svg"
import twitter from "@/public/footerSVGs/twitter.svg"
import yout from "@/public/footerSVGs/youtube.svg"

const Footer = () => {
  const fullYear = new Date().getFullYear()
  return (
    <div
      style={{
        background: "linear-gradient(174deg, #012A59 34.34%, #B21450 168.1%)",
      }}
      className="p-30 mt-[82px] px-[9vw]    py-9 text-white"
    >
      <div className="flex items-start justify-between">
        <div className="mb-[39px] mt-[23px] flex w-full flex-col pl-4 md:mt-[70px] ">
          {/* Brand logo footer */}
          <span>
            <Image
              src={footerlogo}
              width={228}
              height={41.62}
              alt=" Logo Footer"
              className=""
            />
            {/* <h3 className="text-[14px] font-[300] text-[#9A9CA2] md:text-[20px] md:font-[400]">
              Powered by Invisor
            </h3> */}
          </span>

          {/* page links small screen */}
          <div className="mt-[54px] flex flex-col gap-[50px] md:hidden invisible">
            <div className="flex flex-col gap-[32px]">
              <h2 className="text-[20px] font-[500] text-[#FDF9F]">
                Quick Links
              </h2>
              <span className="flex flex-col gap-1 text-[16px]  font-[400]">
                <Link
                  aria-disabled
                  href="/"
                  className="text-[#9A9CA2] hover:text-white"
                >
                  About Us
                </Link>
                <Link href="/" className="text-[#9A9CA2] hover:text-white">
                  Our Services
                </Link>
                <Link href="/" className="text-[#9A9CA2] hover:text-white">
                  Contact us
                </Link>
                {/* <Link href="#" className="text-[#9A9CA2] hover:text-white">FAQ</Link> */}
              </span>
            </div>
            <div className="flex flex-col gap-[30px]">
              <h2 className="text-[20px] font-[500] text-[#FDF9F]">Login as</h2>
              <span className="flex flex-col gap-1 text-[16px] font-[400]">
                <Link href="" className="text-[#9A9CA2] hover:text-white">
                  Candidate
                </Link>
                <Link href="" className="text-[#9A9CA2] hover:text-white">
                  Employer
                </Link>
                <Link href="" className="text-[#9A9CA2] hover:text-white">
                  Team Lead
                </Link>
                <Link href="" className="text-[#9A9CA2] hover:text-white">
                  Manager
                </Link>
              </span>
            </div>
          </div>

          {/* social icons  */}
          <div className="mt-[97px] flex justify-center gap-[32px] md:justify-start md:gap-[12px]">
            <Link href="https://facebook.com">
              <Image src={fb} width={32} height={32} alt=" Logo Footer" />
            </Link>

            <Link href="https://instagram.com">
              <Image src={ig} width={32} height={32} alt=" Logo Footer" />
            </Link>

            <Link href="https://linkedin.com">
              <Image src={linkedin} width={32} height={32} alt=" Logo Footer" />
            </Link>

            <Link href="https://youtube.com">
              <Image src={yout} width={32} height={32} alt=" Logo Footer" />
            </Link>

            <Link href="https://twitter.com">
              <Image src={twitter} width={32} height={32} alt=" Logo Footer" />
            </Link>
          </div>
        </div>
        {/* page links for large screen */}
        <div className="hidden w-full items-start justify-center gap-[150px]  md:flex invisible ">
          <div className="flex flex-col gap-[30px]">
            <h2 className="text-[20px] font-[500] text-[#FDF9F]">
              Quick Links
            </h2>
            <span className="flex flex-col gap-2 text-[16px] font-[400]">
              <Link href="/" className="text-[#9A9CA2] hover:text-white">
                About Us
              </Link>
              <Link href="/" className="text-[#9A9CA2] hover:text-white">
                Our Services
              </Link>
              <Link href="/" className="text-[#9A9CA2] hover:text-white">
                Contact us
              </Link>
              {/* <Link href="#" className="text-[#9A9CA2] hover:text-white">FAQ</Link> */}
            </span>
          </div>
          <div className="flex flex-col gap-[30px]">
            <h2 className="text-[20px] font-[500] text-[#FDF9F]">Login as</h2>
            <span className="flex flex-col gap-2 text-[16px] font-[400] text-[#F7F7F7]">
              <Link href="" className="text-[#9A9CA2] hover:text-white">
                Candidate
              </Link>
              <Link href="" className="text-[#9A9CA2] hover:text-white">
                Employer
              </Link>
              <Link href="" className="text-[#9A9CA2] hover:text-white">
                Team Lead
              </Link>
              <Link href="" className="text-[#9A9CA2] hover:text-white">
                Manager
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* divider line with copyright text */}
      <div className="border border-x-0 border-b-0 border-t-white text-center opacity-20 " />
      <p className=" mt-[32px] text-center text-[20px] text-[#9A9CA2] text-[400] opacity-70">
        Copyright &copy; {fullYear} &middot; fintalent . All rights reserved.
      </p>
    </div>
  )
}

export default Footer
