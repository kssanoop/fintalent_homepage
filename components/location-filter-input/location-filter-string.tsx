import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { MenuList } from "@/components/menu-list";

const LocationFilterInputString = ({ ...props }) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = cities && generateOptions(cities);

  return (
    <Controller
      name={props.name}
      {...props}
      render={({ field }) => (
        <>
          <ReactSelect
            value={field.value.value}
            onChange={(newValue: any) => {
              console.log(newValue);
              if (newValue === null) {
                field.onChange();
                return;
              }
              field.onChange(newValue.value);
            }}
            // @ts-ignore
            itemSize={() => 49}
            components={{ MenuList }}
            options={citiesOptions}
            isClearable
            isLoading={isCitiesLoading}
            placeholder="Select location"
            styles={{
              control: () => ({
                width: "100%",
              }),
            }}
            classNames={classNameForReactSelect}
          />
        </>
      )}
    />
  );
};

export default LocationFilterInputString;
