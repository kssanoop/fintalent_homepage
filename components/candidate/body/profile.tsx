import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Verified from "@/components/verified";
import ScoreCardList from "./score-card/score-card-list";
import { ChevronRight, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import SkillCardList from "./skill/skill-card-list";
import useGetCandidateProfileStatus from "@/features/profile/candidate/api/get-profile-status";
import useGetCandidateProfile from "@/features/profile/candidate/api/getProfile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { truncate } from "lodash";

const Profile = () => {
  const [showProfileStatus, setShowProfilestatus] = useState(true);
  const { data: profileStatusdata } = useGetCandidateProfileStatus();

  const { data: candidateProfileData } = useGetCandidateProfile();

  function getColorBasedOnPercentage(score: number | undefined) {
    if (score && score <= 25) {
      return "#E72F2F";
    } else if (score && score <= 50) {
      return "#FF6C22";
    } else if (score && score <= 75) {
      return "#E9B824";
    } else {
      return "#00BA70";
    }
  }

  const SCORE_INFO = [
    {
      name: "candidateScore" as "candidateScore",
      heading: "Candidate Score",
      score: candidateProfileData?.candidateScore ?? 0,
      scoreColor: getColorBasedOnPercentage(
        candidateProfileData?.candidateScore,
      ),
    },
    {
      name: "trustScore" as "trustScore",
      heading: "Trust Score",
      score: candidateProfileData?.trustScore ?? 0,
      scoreColor: getColorBasedOnPercentage(candidateProfileData?.trustScore),
    },
  ];

  const SKILLS_INFO = {
    heading: "Skills",
    totalRating: 10,
    skills: candidateProfileData?.skills?.slice(0, 2) || [],
  };

  const SUMMARY_INFO = {
    heading: "Summary",
    value: candidateProfileData?.summary,
  };

  const profile = {
    name: candidateProfileData?.fullName,
    skill: candidateProfileData?.jobTitle,
    currentlyAt: `Currently at ${candidateProfileData?.currentOrganization}`,
    exp: `. Exp -
     ${
       candidateProfileData && candidateProfileData?.totalExperience?.year > 0
         ? `${candidateProfileData?.totalExperience?.year} yrs`
         : `${candidateProfileData?.totalExperience?.year} yr`
     }`,
    isVerified: candidateProfileData && candidateProfileData?.profileVerified,
  };

  const router = useRouter();
  return (
    <Card className="flex flex-col gap-4 p-5 md:h-full">
      <CardHeader className="flex-row gap-2 p-0">
        <Avatar className="h-[82px] w-[82px]">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidateProfileData?.profilePhoto?.storageName}`}
          />
          <AvatarFallback>{profile.name}</AvatarFallback>
        </Avatar>
        <div className="break-all">
          {/* name */}
          <div className="flex items-center gap-1">
            <h3 className="mb-1 text-xl font-extrabold capitalize ">
              {profile.name}
            </h3>
            <Verified
              isVerified={profile.isVerified ? profile.isVerified : false}
            />
          </div>
          {/* description */}
          <div className="flex flex-col gap-1 text-sm font-medium">
            <p className="text-[#171717]">{profile.skill}</p>
            <div className="flex text-[#5E5E5E]">
              <p className="w-full truncate">{profile.currentlyAt}</p>
              <p className="w-full">{profile.exp}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0 pb-1 md:grow  ">
        {/* candidate score */}
        <div className="flex gap-3">
          <ScoreCardList
            scoreList={SCORE_INFO}
            scoreCardScoreClassName="text-2xl"
            scoreCardClassName="text-sm"
          />
        </div>

        {/* alert: profile completion */}
        {showProfileStatus && profileStatusdata !== 100 && (
          <div className="rounded-sm border border-[#034a9a] bg-[rgba(3,74,154,0.17)] p-3">
            {/* heading & close */}
            <div className="mb-2 flex items-center justify-between">
              <h6 className="font-bold text-[#171717]">
                Your profile is {profileStatusdata}% complete
              </h6>
              <X
                color="#5e5e5e"
                className="cursor-pointer"
                onClick={() => {
                  setShowProfilestatus(false);
                }}
              />
            </div>
            {/* progress */}
            <Progress
              value={profileStatusdata}
              className="mb-3 h-[3px] bg-[#EFEFEF]"
              indicatorColor={
                profileStatusdata <= 40
                  ? "bg-red-500"
                  : profileStatusdata <= 60
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }
            />

            {/* description & redirection */}
            <div className="flex items-end justify-between text-sm">
              <p>This will increase your chances of getting hired.</p>
              <ChevronRight
                className="cursor-pointer"
                onClick={() => {
                  router.push("/candidate/profile");
                }}
              />
            </div>
          </div>
        )}

        {/* skills */}
        <div className="text-sm">
          {/* heading */}
          <h3 className="mb-2 font-medium text-[#5E5E5E]">
            {SKILLS_INFO.heading}
          </h3>
          {/* skills */}
          <div className="flex flex-wrap gap-[14px]">
            {SKILLS_INFO && (
              <SkillCardList
                skillList={SKILLS_INFO?.skills}
                totalRating={SKILLS_INFO?.totalRating}
                className="[&>div]:pr-3.5 [&_>p]:pl-3.5"
              />
            )}
          </div>
        </div>

        {/* summary */}
        <div className="md:grow">
          <h3 className="mb-2 text-sm text-[#5E5E5E]">
            {SUMMARY_INFO.heading}
          </h3>
          <p>
            {truncate(SUMMARY_INFO.value, {
              length: 80,
              omission: "...",
            })}
            {/* {SUMMARY_INFO.value} */}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Link href="/candidate/profile" className="w-full">
          <Button variant="outline" className="w-full bg-white">
            View full Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Profile;
