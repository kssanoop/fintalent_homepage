import Image from "next/image"
import Link from "next/link"
import React from "react"
import backImg from "@/public/svg/navbg.svg"
import headerLogo from "@/public/logoDark.svg"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()
  return (
    <div className="relative flex w-full justify-between bg-transparent px-[30px] py-[28px] md:px-[120px]">
      <Image
        src={backImg}
        alt="logo"
        // width={140}
        // height={28}
        className="absolute left-0 top-0 -z-10 mx-auto h-[300px] w-screen overflow-hidden object-cover md:px-[6vw]"
      />
      <Link href="/" className="relative h-7 w-[140px]">
        <Image src={headerLogo} alt="logo" fill />
      </Link>
      <div className="flex gap-[16px] text-[14px] font-[500] md:gap-[40px] md:text-[16px]">
        <Link
          href="/candidate-page"
          className={router.pathname === "/candidate-page" ? "font-bold" : ""}
        >
          For Candidate
        </Link>
        <Link
          aria-disabled
          href="/"
          className={router.pathname === "/recruiter-page" ? "font-bold" : ""}
        >
          For Recruiter
        </Link>
      </div>
    </div>
  )
}

export default Header
