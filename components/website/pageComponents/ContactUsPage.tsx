import { useForm } from "react-hook-form";
import Image from "next/image";
import Tick from "@/public/aboutusSVGs/tick.svg";
import mailbox from "@/public/aboutusSVGs/mailbox.svg";
import phoneIcon from "@/public/aboutusSVGs/phonesvg.svg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";
import Link from "next/link";

export type ContactUsSchema = {
  firstName: string;
  lastName: string;
  company: string;
  location: string;
  email: string;
  phoneNumber: string;
};

const ContactUsPage = () => {
  const form = useForm<ContactUsSchema>({
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      location: "",
      email: "",
      phoneNumber: "",
    },
  });

  // const handleSubmit = async (data: ContactUsSchema) => {
  //   // console.log(data);

  //   try {
  //     const response = await fetch(
  //       "https://formsubmit.co/59237c3355a7dc207c1ef56fde2788a9",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify(data),
  //       },
  //     );

  //     // if (response.ok) {
  //     //   console.log('Form submitted successfully!');
  //     //   // Add any further actions you want to perform upon successful submission
  //     // } else {
  //     //   console.error('Form submission failed.');
  //     //   // Handle the error or display a message to the user
  //     // }
  //   } catch (error) {
  //     console.error("An error occurred during form submission:", error);
  //     // Handle the error or display a message to the user
  //   }

  //   // form.reset({
  //   //   firstName: "",
  //   //   lastName: "",
  //   //   company: "",
  //   //   location: "",
  //   //   email: "",
  //   //   phoneNumber: "",
  //   // });
  // };

  //validations
  const validateFirstName = (value: string) => {
    if (!value) {
      return "First Name is required";
    }
    return true;
  };

  const validateLastName = (value: string) => {
    if (!value) {
      return "Last Name is required";
    }
    return true;
  };

  const validateCompany = (value: string) => {
    if (!value) {
      return "Company is required";
    }
    return true;
  };

  const validateLocation = (value: string) => {
    if (!value) {
      return "Location is required";
    }
    return true;
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return "Email is required";
    }

    return true;
  };

  const validatePhoneNumber = (value: string) => {
    if (!value) {
      return "Phone Number is required";
    }

    return true;
  };

  return (
    <div className="mt-[27px] flex w-full flex-col md:flex-row md:px-[7vw] ">
      <SlideAnimationWrapper
        direction="down"
        className="container mx-auto w-full items-center md:w-[45vw] "
      >
        <h1 className="text-[40px] font-[800]">
          Hire qualified candidates in 5 working days!
        </h1>
        <div className="mt-[32px] flex flex-col gap-[23px]">
          <div className="flex gap-2">
            <div className="flex w-[34px] items-center justify-center">
              <Image
                src={Tick}
                width={22}
                height={21}
                alt="tick"
                className="items-center "
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(94deg, #C3D0DD 7.71%, #BEABC1 80.92%)",
                  boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
                }}
              />
            </div>
            <p className="text-[16px] font-[500] text-[#5E5E5E]">
              Hire ready to deploy candidates.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="flex w-[34px] items-center justify-center">
              <Image
                src={Tick}
                width={22}
                height={21}
                alt="tick"
                className="items-center "
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(94deg, #C3D0DD 7.71%, #BEABC1 80.92%)",
                  boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
                }}
              />
            </div>
            <p className="text-[16px] font-[500] text-[#5E5E5E]">
              Reduce the bench cost
            </p>
          </div>

          <div className="flex gap-2">
            <div className="flex w-[34px] items-center justify-center">
              <Image
                src={Tick}
                width={22}
                height={21}
                alt="tick"
                className="items-center "
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(94deg, #C3D0DD 7.71%, #BEABC1 80.92%)",
                  boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
                }}
              />
            </div>
            <p className="text-[16px] font-[500] text-[#5E5E5E]">
              Faster Hiring
            </p>
          </div>
        </div>
        <div className="mt-[92px] flex flex-col gap-[39px] sm:flex-row">
          <Link
            href="mailto:info@fintalent.in"
            className="flex items-center gap-1"
          >
            <Image src={mailbox} alt="mail-icon" width={24} height={24} />
            <span>info@fintalent.in</span>
          </Link>
          <Link href="tel:+917012030702" className="flex items-center gap-1">
            <Image src={phoneIcon} alt="phone-icon" width={24} height={24} />
            <span>7012030702</span>
          </Link>
        </div>
      </SlideAnimationWrapper>

      <SlideAnimationWrapper direction="down" className="mt-[40px] md:mt-0 ">
        <div
          style={{ border: "1px solid var(--Grey-3, #E1E1E1)" }}
          className=" container w-full rounded-[8px] pb-[60px] pt-[60px] md:w-[45vw] "
        >
          <form
            action="https://formsubmit.co/info@fintalent.in"
            method="POST"
            className="mt-8 flex w-[85vw] flex-col gap-[24px] sm:mx-auto sm:w-[70vw] md:w-full"
          >
            <div className="flex w-full flex-col  gap-2 md:flex-row lg:gap-[27px] ">
              <div className="w-full ">
                <label>First Name</label>
                <input
                  className="mt-[4px] w-full rounded-[5px] bg-white px-[12px] py-[5px] text-[16px] font-[500] lg:h-[48px]"
                  style={{ border: "1px solid var(--Grey-3, #E1E1E1)" }}
                  type="text"
                  required
                  name="firstName"
                />
              </div>
              <div className="w-full ">
                <label>Last Name</label>
                <input
                  className="mt-[4px] w-full rounded-[5px] px-[12px] py-[5px] text-[16px] font-[500] lg:h-[48px]"
                  style={{ border: "1px solid var(--Grey-3, #E1E1E1)" }}
                  type="text"
                  required
                  name="LastName"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 md:flex-row  lg:gap-[27px]">
              <div className="w-full ">
                <label>Email</label>
                <input
                  className="mt-[4px] w-full rounded-[5px] px-[12px] py-[5px] text-[16px] font-[500] lg:h-[48px]"
                  style={{ border: "1px solid var(--Grey-3, #E1E1E1)" }}
                  type="text"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  name="email"
                  required
                />
              </div>
              <div className="mb-[4px] w-full">
                <label>Phone Number</label>
                <input
                  className="mt-[4px] w-full rounded-[5px] px-[12px] py-[5px] text-[16px] font-[500] lg:h-[48px]"
                  style={{ border: "1px solid var(--Grey-3, #E1E1E1)" }}
                  type="tel"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  required
                  name="phoneNumber"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 md:flex-row  lg:gap-[27px]">
              <div className="mb-[4px] w-full">
                <label>Company Name</label>
                <input
                  className="mt-[4px] w-full rounded-[5px] px-[12px] py-[5px] text-[16px] font-[500] lg:h-[48px]"
                  style={{ border: "1px solid var(--Grey-3, #E1E1E1)" }}
                  type="text"
                  required
                  name="company"
                />
              </div>
              <div className="mb-[4px] w-full">
                <label>Location</label>
                <input
                  className="mt-[4px] w-full rounded-[5px] px-[12px] py-[5px] text-[16px] font-[500] lg:h-[48px]"
                  style={{ border: "1px solid var(--Grey-3, #E1E1E1)" }}
                  type="text"
                  required
                  name="location"
                />
              </div>
            </div>
            <div className="flex w-full justify-end">
              <Button
                type="submit"
                variant="gradient"
                size="sm"
                className="text-md h-[59px] px-8 text-[18px] font-bold shadow-submit-btn"
              >
                Request Demo
              </Button>
            </div>
          </form>
        </div>
      </SlideAnimationWrapper>
    </div>
  );
};

export default ContactUsPage;
