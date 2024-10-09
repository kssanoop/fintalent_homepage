import { useQuery } from "@tanstack/react-query";
import { Country } from "../type/country";
import axios from "axios";

const headers = {
  "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_LOCATION_API_KEY as string,
};

const getCities = async (
  countryId: string | undefined,
  stateId: string | undefined,
): Promise<Country[]> => {
  const response = await axios({
    method: "GET",
    headers,
    url: `${process.env.NEXT_PUBLIC_LOCATION_API_URL}/countries/${countryId}/states/${stateId}/cities`,
  });
  return response.data;
};

function useGetCities({
  countryId,
  stateId,
}: {
  countryId: string | undefined;
  stateId: string | undefined;
}) {
  return useQuery({
    queryKey: ["all-cities", countryId, stateId],
    queryFn: async () => await getCities(countryId, stateId),
    refetchOnWindowFocus: false,
    enabled: !!countryId && !!stateId,
  });
}

export default useGetCities;
