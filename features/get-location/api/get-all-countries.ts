import { useQuery } from "@tanstack/react-query";
import { Country } from "../type/country";
import axios from "axios";

const headers = {
  "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_LOCATION_API_KEY as string,
};

const getAllCountries = async (): Promise<Country[]> => {
  const response = await axios({
    method: "GET",
    headers,
    url: `${process.env.NEXT_PUBLIC_LOCATION_API_URL}/countries`,
  });
  console.log(response);
  return response.data;
};

function useGetAllCountries() {
  return useQuery({
    queryKey: ["all-countries"],
    queryFn: async () => await getAllCountries(),
    refetchOnWindowFocus: false,
  });
}

export default useGetAllCountries;
