import { ReactElement, useRef, useState } from "react";

import {
  Info,
  Loader2,
  MoreVertical,
  Pause,
  Play,
  Trash,
  Pencil as EditIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import VideoDropzone from "./VideoDropzone";
import { useAddData } from "@/features/ProfileEdit/WorkHistory/api/updateWorkHistory";
import { toast } from "sonner";
import { ROLES } from "@/types/authorization";
import EditTrustScoreDialog from "./edit-trust-score-dialog";
export interface Score {
  label: "Candidate Score" | "Trust score";
  score: string;
  icon: ReactElement;
  iconBg: string;
  borderColor: string;
  tooltipContent: string;
  progressbarColor: string;
}

interface AnalyticsAndVideoCardProps {
  candidateScore: string;
  trustScore: string;
  videoUrl?: string;
  refetch: () => void;
  resumeVideo: { originalName: string; storageName: string };
  Interface: string;
}

const AnalyticsAndVideoCard = ({
  candidateScore,
  trustScore,
  resumeVideo,
  refetch,
  Interface,
}: AnalyticsAndVideoCardProps) => {
  const [showDotIcon, setShowDotIcon] = useState(false);
  const [showOption, setShowOption] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const score: Score[] = [
    {
      label: "Candidate Score",
      score: candidateScore,
      // icon: <Flag color="#FFB637" />,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="27"
          viewBox="0 0 25 27"
          fill="none"
        >
          <path
            d="M12.88 3.74902C13.0657 3.74913 13.2477 3.80523 13.4056 3.91104C13.5635 4.01685 13.6911 4.16819 13.774 4.34811L14.498 5.91569H20.498C20.7633 5.91569 21.0176 6.02983 21.2052 6.23299C21.3927 6.43616 21.498 6.71171 21.498 6.99902V18.9157C21.498 19.203 21.3927 19.4786 21.2052 19.6817C21.0176 19.8849 20.7633 19.999 20.498 19.999H14.116C13.9304 19.9989 13.7484 19.9428 13.5905 19.837C13.4326 19.7312 13.305 19.5799 13.222 19.3999L12.498 17.8324H5.49805V24.3324H3.49805V3.74902H12.88ZM12.262 5.91569H5.49805V15.6657H13.734L14.734 17.8324H19.498V8.08236H13.262L12.262 5.91569Z"
            fill="#FFB637"
          />
        </svg>
      ),
      iconBg: "#FFF5E2",
      borderColor: "#FFDEA5",
      progressbarColor: "",
      tooltipContent:
        "Lorem ipsum dolor sit amet consectetur. Purus odio adipiscing libero pretium nullam fermentum id et.",
    },
    {
      label: "Trust score",
      score: trustScore,
      // icon: <HeartHandshake color="#2B77E8" />,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M12.2932 4.11426C12.2034 4.1141 12.1148 4.13407 12.0338 4.1727C11.9528 4.21132 11.8815 4.26763 11.8252 4.33746L11.7184 4.41666C9.64836 3.77586 7.28676 4.24626 5.64276 5.83026C4.95431 6.48352 4.44216 7.30021 4.1539 8.20443C3.86564 9.10866 3.81062 10.0711 3.99396 11.0023C3.97359 11.0202 3.95358 11.0386 3.93396 11.0575L2.99916 11.9575C2.81833 12.129 2.67433 12.3356 2.57592 12.5646C2.47751 12.7936 2.42676 13.0402 2.42676 13.2895C2.42676 13.5387 2.47751 13.7853 2.57592 14.0143C2.67433 14.2434 2.81833 14.4499 2.99916 14.6215C3.47676 15.0823 4.13916 15.2551 4.75476 15.1399C4.83036 15.4867 5.00676 15.8167 5.28636 16.0855C5.65476 16.4407 6.13356 16.6243 6.61596 16.6375C6.62916 17.1019 6.81996 17.5627 7.18836 17.9179C7.55676 18.2731 8.03676 18.4579 8.51916 18.4699C8.53116 18.9343 8.72316 19.3963 9.09156 19.7515C9.44425 20.0862 9.90626 20.2818 10.3921 20.3021C10.8779 20.3224 11.3546 20.166 11.734 19.8619L12.2584 20.3659C13.0264 21.1063 14.272 21.1063 15.04 20.3659C15.4072 20.0131 15.598 19.5547 15.6148 19.0915C16.108 19.0787 16.5788 18.8823 16.9348 18.5407C17.302 18.1867 17.4928 17.7283 17.5072 17.2651C17.9949 17.248 18.4592 17.0519 18.8116 16.7143C19.1032 16.4347 19.2832 16.0879 19.3528 15.7255C19.6616 15.7796 19.9789 15.7605 20.2791 15.6696C20.5792 15.5787 20.8538 15.4187 21.0808 15.2023C21.2618 15.0307 21.4059 14.8241 21.5045 14.595C21.603 14.3658 21.6538 14.1191 21.6538 13.8697C21.6538 13.6203 21.603 13.3735 21.5045 13.1444C21.4059 12.9153 21.2618 12.7086 21.0808 12.5371L20.2168 11.7055L20.3932 11.0455C20.75 9.69615 20.5693 8.26101 19.8892 7.04226C18.886 5.23506 16.9396 4.11906 14.8348 4.11906H13.3588C13.2952 4.11591 13.2316 4.11431 13.168 4.11426H12.2932ZM15.2368 8.57346L18.1228 11.3539L18.1264 11.3563L20.2156 13.3699C20.2834 13.4342 20.3375 13.5117 20.3744 13.5976C20.4113 13.6836 20.4304 13.7761 20.4304 13.8697C20.4304 13.9632 20.4113 14.0557 20.3744 14.1417C20.3375 14.2276 20.2834 14.3051 20.2156 14.3695C20.0754 14.5022 19.8896 14.5762 19.6966 14.5762C19.5035 14.5762 19.3178 14.5022 19.1776 14.3695L17.5924 12.8431C17.4762 12.7316 17.3214 12.6693 17.1604 12.6693C16.9993 12.6693 16.8446 12.7316 16.7284 12.8431L16.7116 12.8575C16.655 12.9111 16.6099 12.9756 16.5791 13.0472C16.5483 13.1188 16.5325 13.1959 16.5325 13.2739C16.5325 13.3518 16.5483 13.4289 16.5791 13.5005C16.6099 13.5721 16.655 13.6367 16.7116 13.6903L17.9476 14.8807C18.2356 15.1567 18.2356 15.6055 17.9476 15.8827C17.8201 16.0034 17.6546 16.0761 17.4794 16.0881C17.3042 16.1002 17.1303 16.0509 16.9876 15.9487C16.8684 15.8626 16.7228 15.8209 16.5762 15.831C16.4295 15.8411 16.291 15.9023 16.1848 16.0039C16.0809 16.1032 16.0182 16.2379 16.0091 16.3813C16 16.5246 16.0451 16.6662 16.1356 16.7779C16.2433 16.9128 16.2964 17.0832 16.2844 17.2555C16.2724 17.4277 16.1962 17.5892 16.0708 17.7079C15.9415 17.8304 15.7731 17.9034 15.5953 17.914C15.4174 17.9245 15.2416 17.8719 15.0988 17.7655C14.9802 17.6765 14.834 17.6323 14.686 17.6407C14.5381 17.649 14.3978 17.7094 14.29 17.8111C14.1848 17.9102 14.121 18.0455 14.1114 18.1897C14.1018 18.334 14.1472 18.4765 14.2384 18.5887C14.3486 18.7254 14.4033 18.8986 14.3915 19.0739C14.3797 19.2491 14.3023 19.4135 14.1748 19.5343C14.0327 19.6691 13.8444 19.7442 13.6486 19.7442C13.4527 19.7442 13.2644 19.6691 13.1224 19.5343L12.6028 19.0339L12.7924 18.8515C12.9734 18.6799 13.1175 18.4733 13.2161 18.2441C13.3146 18.015 13.3654 17.7683 13.3654 17.5189C13.3654 17.2695 13.3146 17.0227 13.2161 16.7936C13.1175 16.5645 12.9734 16.3578 12.7924 16.1863C12.4337 15.8425 11.9594 15.6456 11.4628 15.6343C11.4482 15.1483 11.2425 14.6878 10.8904 14.3527C10.5312 14.0091 10.0564 13.8126 9.55956 13.8019C9.545 13.3159 9.3393 12.8554 8.98716 12.5203C8.75663 12.3008 8.47715 12.1395 8.17185 12.0495C7.86656 11.9596 7.54424 11.9437 7.23156 12.0031C7.15246 11.642 6.96736 11.3127 6.69996 11.0575C6.49498 10.8619 6.25072 10.7121 5.98341 10.6182C5.71609 10.5242 5.43185 10.4883 5.14956 10.5127C5.05502 9.80948 5.12864 9.0939 5.36436 8.4247C5.60009 7.7555 5.99119 7.15175 6.50556 6.66306C7.02533 6.16649 7.64852 5.79105 8.33046 5.56367C9.01239 5.33629 9.73619 5.26259 10.45 5.34786L8.70396 6.63186C8.48057 6.79418 8.29238 7.0001 8.15078 7.23717C8.00918 7.47425 7.91709 7.73756 7.88008 8.01121C7.84307 8.28486 7.86191 8.56318 7.93545 8.82935C8.00899 9.09552 8.13571 9.34402 8.30796 9.55986C8.65632 9.99666 9.15969 10.2823 9.71332 10.3574C10.267 10.4325 10.8282 10.2913 11.2804 9.96306L13.1716 8.57466L15.2368 8.57346ZM9.41436 7.59786L12.5248 5.31426H13.168C13.2268 5.31395 13.2856 5.31555 13.3444 5.31906H14.8348C16.5196 5.31906 18.0568 6.21306 18.8404 7.62546C19.3708 8.58066 19.51 9.69066 19.2328 10.7383L19.2292 10.7503L15.9172 7.54986C15.8049 7.43726 15.6526 7.37381 15.4936 7.37346H12.9736C12.8462 7.3737 12.7222 7.41447 12.6196 7.48986L10.57 8.99466C10.3686 9.13882 10.1198 9.2006 9.87446 9.16736C9.62908 9.13413 9.40568 9.00838 9.24996 8.81586C9.1774 8.72647 9.12389 8.62317 9.09275 8.51232C9.06161 8.40147 9.0535 8.28543 9.0689 8.17132C9.0843 8.05722 9.12289 7.94748 9.18231 7.84885C9.24172 7.75023 9.32069 7.66481 9.41436 7.59786ZM9.94476 17.9299L9.95676 17.9179L10.8904 17.0179L10.9012 17.0083C11.0421 16.8801 11.2264 16.81 11.4169 16.812C11.6074 16.814 11.7901 16.8879 11.9284 17.0191C11.9962 17.0834 12.0503 17.1609 12.0872 17.2468C12.1241 17.3328 12.1432 17.4253 12.1432 17.5189C12.1432 17.6124 12.1241 17.7049 12.0872 17.7909C12.0503 17.8768 11.9962 17.9543 11.9284 18.0187L10.9936 18.9187C10.8534 19.0514 10.6676 19.1254 10.4746 19.1254C10.2815 19.1254 10.0958 19.0514 9.95556 18.9187C9.88859 18.8553 9.83503 18.7791 9.79805 18.6946C9.76108 18.6101 9.74146 18.519 9.74034 18.4268C9.73922 18.3346 9.75663 18.2431 9.79154 18.1577C9.82645 18.0723 9.87934 17.9949 9.94476 17.9299ZM10.0372 16.1755L10.0252 16.1863L9.09156 17.0863L9.07956 17.0971C8.93851 17.2247 8.75445 17.2944 8.56421 17.2922C8.37397 17.29 8.19159 17.216 8.05356 17.0851C7.98645 17.0214 7.93286 16.9448 7.89598 16.86C7.8591 16.7752 7.83969 16.6837 7.83891 16.5912C7.83812 16.4987 7.85598 16.407 7.89142 16.3216C7.92686 16.2361 7.97914 16.1587 8.04516 16.0939L8.05356 16.0855L8.98716 15.1855L8.99556 15.1771C9.13637 15.0479 9.32093 14.9769 9.51202 14.9784C9.7031 14.98 9.88649 15.054 10.0252 15.1855C10.0923 15.2489 10.146 15.3252 10.1831 15.4098C10.2202 15.4944 10.2399 15.5856 10.241 15.6779C10.2421 15.7703 10.2247 15.8619 10.1896 15.9474C10.1546 16.0329 10.1028 16.1104 10.0372 16.1755ZM8.12316 14.3527L7.18836 15.2527L7.17996 15.2611C7.03916 15.3902 6.85459 15.4612 6.66351 15.4597C6.47242 15.4581 6.28904 15.3841 6.15036 15.2527C6.0825 15.1883 6.02845 15.1108 5.99151 15.0249C5.95458 14.9389 5.93553 14.8464 5.93553 14.7529C5.93553 14.6593 5.95458 14.5668 5.99151 14.4809C6.02845 14.3949 6.0825 14.3174 6.15036 14.2531L7.08396 13.3531C7.22421 13.2199 7.4102 13.1457 7.60356 13.1457C7.79692 13.1457 7.98291 13.2199 8.12316 13.3531C8.19045 13.4168 8.2442 13.4934 8.28119 13.5783C8.31818 13.6633 8.33765 13.7548 8.33844 13.8475C8.33922 13.9401 8.3213 14.032 8.28576 14.1176C8.25021 14.2031 8.19777 14.2806 8.13156 14.3455L8.12316 14.3527ZM5.83596 12.8899L4.90236 13.7899C4.76225 13.9232 4.57621 13.9976 4.38276 13.9976C4.18932 13.9976 4.00328 13.9232 3.86316 13.7899C3.79511 13.7255 3.7409 13.6479 3.70385 13.5619C3.66681 13.4758 3.6477 13.3831 3.6477 13.2895C3.6477 13.1958 3.66681 13.1031 3.70385 13.017C3.7409 12.931 3.79511 12.8534 3.86316 12.7891L4.79796 11.8891C4.93815 11.7563 5.12389 11.6823 5.31696 11.6823C5.51004 11.6823 5.69577 11.7563 5.83596 11.8891C5.90402 11.9534 5.95823 12.031 5.99527 12.1171C6.03232 12.2031 6.05143 12.2958 6.05143 12.3895C6.05143 12.4831 6.03232 12.5758 5.99527 12.6619C5.95823 12.7479 5.90402 12.8255 5.83596 12.8899Z"
            fill="#2B77E8"
          />
        </svg>
      ),
      iconBg: "#D0E3FF",
      borderColor: "#A4C8FF",
      progressbarColor: "",
      tooltipContent:
        "Lorem ipsum dolor sit amet consectetur. Purus odio adipiscing libero pretium nullam fermentum id et.",
    },
  ];

  function getColorBasedOnPercentage(score: number) {
    if (score <= 25) {
      return "#E72F2F";
    } else if (score <= 50) {
      return "#FF6C22";
    } else if (score <= 75) {
      return "#E9B824";
    } else {
      return "#00BA70";
    }
  }

  const toggleShowOption = () => {
    setShowOption(!showOption);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef?.current;

    // Check if video is not null before accessing its properties
    if (video?.paused) {
      video.play();
      setIsPlaying(true);
    } else if (video) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSuccess = (data: any) => {
    refetch();
    toast.success("Video Deleted successfully");
  };
  const handleError = () => {
    toast.error("Error occured while  Deleting Video");
  };

  const {
    mutate,
    isLoading: isDeleteing,
    // isError: isDeleteError,
  } = useAddData(handleSuccess, handleError);

  const handleDeleteVideo = () => {
    // console.log("delete");
    const VideoData = {
      resumeVideo: { originalName: "", storageName: "" },
    };
    mutate(VideoData);
  };

  return (
    <div className="flex flex-col gap-2 pt-2 md:pt-0 lg:h-[185px] lg:flex-row lg:gap-[9px]">
      <div className="flex gap-3 lg:w-3/5 lg:gap-[9px]">
        {score.map(
          ({
            label,
            score,
            icon,
            iconBg,
            borderColor,
            tooltipContent,
            progressbarColor,
          }) => (
            <Card key={crypto.randomUUID()} className="w-full">
              <CardHeader
                className="flex flex-col items-start gap-1 space-y-2 whitespace-nowrap px-3
               pb-3 pt-3 md:flex-row md:items-center md:justify-center md:space-y-0  md:px-2.5 md:pb-0 md:pt-6"
              >
                <div
                  style={{ backgroundColor: iconBg, borderColor }}
                  className="rounded-[1.9px]  border-[0.478px]  p-1"
                >
                  {icon}
                </div>
                <CardTitle className="text-sm font-bold text-[#171717] md:text-base">
                  {label}
                </CardTitle>
                {Interface !== ROLES.ADMIN ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="hidden md:flex">
                        <Info color="#A9A9A9" size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px] whitespace-pre-wrap bg-[#404040] p-3 text-sm font-normal text-[#F7F7F7]">
                        {tooltipContent}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  label === "Trust score" && (
                    <EditIcon
                      onClick={() => {
                        setEditDialogOpen(true);
                      }}
                      fill="#A9A9A9"
                      color="white"
                      size={16}
                      className="cursor-pointer"
                    />
                  )
                )}
              </CardHeader>
              <CardContent className="flex md:items-center md:justify-center">
                <p
                  style={{ color: getColorBasedOnPercentage(Number(score)) }}
                  className="flex text-start text-2xl font-extrabold md:hidden"
                >
                  {score} %
                </p>
                <div className="hidden h-28 w-28 px-2.5 pt-2 md:flex md:pt-0">
                  <CircularProgressbar
                    className="font-extrabold"
                    maxValue={100}
                    value={Number(score)}
                    text={`${Number(score)}%`}
                    strokeWidth={12}
                    styles={buildStyles({
                      pathColor: getColorBasedOnPercentage(Number(score)),
                      textColor: getColorBasedOnPercentage(Number(score)),
                      textSize: 24,
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>
      <div className="group relative h-full rounded-[8px] lg:w-2/5">
        {resumeVideo?.storageName !== "" ? (
          <div
            className="h-full w-full"
            onMouseOver={() => {
              setShowDotIcon(true);
            }}
            onMouseLeave={() => {
              setShowDotIcon(false);
              setShowOption(false);
            }}
          >
            {!isDeleteing && resumeVideo?.storageName !== "" ? (
              <>
                <video
                  ref={videoRef}
                  className="h-full  w-full rounded-[8px]"
                  controls={isPlaying}
                  style={{ objectFit: "cover" }}
                  onClick={handlePlayPause}
                  onEnded={() => {
                    setIsPlaying(false);
                  }}
                >
                  <source
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${resumeVideo?.storageName}`}
                    type="video/mp4"
                  />
                  Your browser does not support HTML video.
                </video>
                {/* Play Button */}

                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                  style={{ zIndex: 1 }}
                >
                  <button
                    className="flex h-9 w-9 items-center  justify-center md:h-16 md:w-16"
                    onClick={handlePlayPause}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#012A59] to-[#B21450]
"
                    >
                      {isPlaying ? (
                        <Pause fill="#fff" color="#fff" size={16} />
                      ) : (
                        <Play fill="#fff" color="#fff" size={16} />
                      )}
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-24 flex items-center justify-center ">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
              </div>
            )}

            {/* Border */}

            {showDotIcon && Interface === ROLES.CANDIDATE && (
              <div className="absolute right-0 top-3 mr-3">
                <MoreVertical
                  color="#171717"
                  size={20}
                  className="cursor-pointer"
                  onClick={toggleShowOption}
                />
              </div>
            )}

            {showOption && showDotIcon && (
              <div className="absolute right-0 top-0 mr-4 mt-9 cursor-pointer rounded bg-white p-1">
                <div className="flex items-center gap-1 p-1">
                  <Trash color="#034A9A" size={20} />
                  <p
                    className="text-sm font-medium text-[#034A9A]"
                    onClick={() => {
                      handleDeleteVideo();
                      // setShowUploadMenu(true);
                    }}
                  >
                    Delete video
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full">
            {Interface === ROLES.CANDIDATE ? (
              <VideoDropzone refetch={refetch} />
            ) : (
              <Card className="flex h-full items-center justify-center py-4 text-brand-blue">
                No resume video added
              </Card>
            )}
          </div>
        )}
      </div>
      <EditTrustScoreDialog
        trustScore={score[1].score}
        open={editDialogOpen}
        setOpen={(value: boolean) => {
          setEditDialogOpen(value);
        }}
      />
    </div>
  );
};

export default AnalyticsAndVideoCard;
