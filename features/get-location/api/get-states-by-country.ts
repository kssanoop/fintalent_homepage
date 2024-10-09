import { useQuery } from "@tanstack/react-query";
import { Country } from "../type/country";
import axios from "axios";

const headers = {
  "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_LOCATION_API_KEY as string,
};

const getStates = async (countryId: string | undefined): Promise<Country[]> => {
  const response = await axios({
    method: "GET",
    headers,
    url: `${process.env.NEXT_PUBLIC_LOCATION_API_URL}/countries/${countryId}/states`,
  });
  return response.data;
};

function useGetStates({ countryId }: { countryId: string | undefined }) {
  return useQuery({
    queryKey: ["all-states", countryId],
    queryFn: async () => await getStates(countryId),
    refetchOnWindowFocus: false,
    enabled: !!countryId,
  });
}

export default useGetStates;
