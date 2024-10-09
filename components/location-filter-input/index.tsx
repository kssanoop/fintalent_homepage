import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { Controller } from "react-hook-form";
import { MenuList } from "@/components/menu-list";
import MultiSelectInput from "../layout/multi-select-input";

const LocationFilterInput = ({ ...props }) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = cities && generateOptions(cities);

  return (
    <Controller
      name={props.name}
      {...props}
      render={({ field }) => {
        return (
          <>
            <MultiSelectInput
              value={citiesOptions?.find((c: any) => c.value === field.value)}
              onChange={(newValue: any) => {
                console.log("NEW VALE>>>", newValue);
                if (newValue === null) {
                  field.onChange([]);
                  return;
                }
                // field.onChange([newValue.value]);
                field.onChange(newValue.map((item: any) => item.value));
              }}
              // @ts-ignore
              itemSize={() => 49}
              components={{ MenuList }}
              options={citiesOptions}
              isMulti
              isClearable
              isLoading={isCitiesLoading}
              placeholder="Select location"
              // styles={{
              //   control: () => ({
              //     width: "100%",
              //   }),
              // }}
              // classNames={classNameForReactSelect}
            />
          </>
        );
      }}
    />
  );
};

export default LocationFilterInput;
