import { useQuery } from "@tanstack/react-query";
// import { Country } from "../type/country";
import axios from "axios";

type CountryCode = {
  countryCode?: string;
};

const headers = {
  "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_LOCATION_API_KEY as string,
};

// get indian cities
const getCities = async ({ countryCode }: CountryCode): Promise<any> => {
  const response = await axios({
    method: "GET",
    headers,
    url: `${process.env.NEXT_PUBLIC_LOCATION_API_URL}/countries/${countryCode}/cities`,
  });
  return response.data;
};

function useGetCities(countryCode = "IN") {
  return useQuery({
    queryKey: ["all-cities-by-country", countryCode],
    queryFn: async () => await getCities({ countryCode }),
    refetchOnWindowFocus: false,
  });
}

export default useGetCities;
