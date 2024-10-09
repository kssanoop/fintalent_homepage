import { useAuthorization } from "./useAuthorization";
import storage from "../storage";
import { useEffect, useState } from "react";

type UserInfoFromCookie = {
  token: string;
  userDetails: any;
};

export const useGetInfoFromCookie = () => {
  const [userInfoFromCookie, setUserInfoFromCookie] =
    useState<UserInfoFromCookie>({
      token: "",
      userDetails: "",
    });

  useEffect(() => {
    const retrievedToken = storage.getToken("user_data");
    const { userDetails } = storage.getDatafromCookie("user_data") || {};
    console.log(userDetails, retrievedToken);
    setUserInfoFromCookie({
      token: retrievedToken,
      userDetails,
    });
  }, []);

  const { role } = useAuthorization();
  return { role, ...userInfoFromCookie };
};
