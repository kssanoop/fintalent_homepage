import _ from "lodash";
// import { createUrl } from "@/utils/createUrl";
// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/cnHelper";
import { UseFormReturn } from "react-hook-form";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
// import { FormControl, FormField, FormLabel } from "@/components/ui/form";
import { CandidateFilterItem } from "@/lib/constants/filters/candidatesFilter";
import { JobFilterItem } from "@/lib/constants/filters/jobFilters";

// const Item = ({
//   item,
//   form,
// }: {
//   item: CandidateFilterItem;
//   form: UseFormReturn<CandidateFilters, any, undefined>;
// }) => {
//   if (item.filterType === "checkbox")
//     return (
// <>
//   <FormField
//     control={form.control}
//     name={item.query}
//     render={({ field }) => (
//       <>
//         {item.options.map((option) => (
//           <div
//             key={crypto.randomUUID()}
//             className="flex w-1/2 items-center space-x-1"
//           >
//             <FormControl>
//               <Checkbox
//                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                 // @ts-expect-error
//                 checked={field.value?.includes(option.slug)}
//                 onCheckedChange={(checked) => {
//                   checked
//                     ? field.onChange([...field.value, option.slug])
//                     : field.onChange(
//                         field.value?.filter(
//                           (value) => value !== option.slug,
//                         ),
//                       );
//                 }}
//                 id={option.name}
//                 className="h-4 w-4 data-[state=checked]:border-0 data-[state=unchecked]:border-border "
//               />
//             </FormControl>
//             <FormLabel
//               htmlFor={option.name}
//               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//               {option.name}
//             </FormLabel>
//           </div>
//         ))}
//       </>
//     )}
//   />
// </>
//     );

// if (item.filterType === "select")
//   return (
//     <>
//       <Select>
//         <SelectTrigger className="h-auto px-4 py-2">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             {item.options.map((option) => (
//               <SelectItem
//                 key={crypto.randomUUID()}
//                 value={_.lowerFirst(option.name)}
//               >
//                 {option.name}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>

// <FormField
//     control={form.control}
//     name={item.query}
//     render={({ field }) => (
//       <>
//         <FormLabel
//           htmlFor={fieldItem.name}
//           className="mb-1 w-full text-sm font-bold text-brand-black md:w-1/2"
//         >
//           {fieldItem.labelTitle}
//         </FormLabel>{" "}
//         <Select onValueChange={field.onChange} defaultValue={field.value}>
//           <FormControl>
//             <SelectTrigger
//               id={fieldItem.name}
//               className="w-full bg-inherit placeholder:text-[#A9A9A9] md:w-1/2"
//             >
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//           </FormControl>
//           <SelectContent>
//             {fieldItem.options.map((option) => (
//               <SelectItem key={crypto.randomUUID()} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </>
//     )}
//   />
//     </>
//   );
// if (item.filterType === "textbox")
//   return <Input type="text" className="h-auto px-4 py-2" />;
// if (item.filterType === "salary range") return <p>salary range</p>;
// return <h1>Invalid filterType</h1>;
// };

export const FilterItem = ({
  item,
  isLastItem,
  form,
}: {
  item: CandidateFilterItem | JobFilterItem;
  isLastItem: boolean;
  form: UseFormReturn<CandidateFilters, any, CandidateFilters>;
}) => {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const active = searchParams.get("sort") === item.slug;
  // const q = searchParams.get("q");
  // const href = createUrl(
  //   pathname,
  //   new URLSearchParams({
  //     ...(q && { q }),
  //     ...(item.slug && item.slug.length && { sort: item.slug }),
  //   }),
  // );
  // const DynamicTag = active ? "p" : Link;
  return (
    <li
      key={item.title}
      className={cn(
        "border-t border-border-secondary p-4 text-sm font-medium text-brand-black",
        isLastItem && "pb-0",
      )}
    >
      <h4 className="mb-3 font-bold ">{item.title}</h4>
      {item.title === "Gender" ||
      item.title === "Age" ||
      item.title === "OtherRowWiseItem" ? (
        <div className="flex w-full flex-row">
          {item.filterType === "textbox" && (
            <Input type="text" className="h-auto px-4 py-2" />
          )}
          {item.filterType === "select" && (
            <Select>
              <SelectTrigger className="h-auto px-4 py-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {item.options?.map((option) => (
                    <SelectItem
                      key={crypto.randomUUID()}
                      value={_.lowerFirst(option.name)}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {/* Add additional conditions for other filter types */}
        </div>
      ) : (
        <div className="flex flex-wrap gap-y-4">
          {/* <Item item={item} /> */}
        </div>
      )}
      {/* <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx("w-full hover:underline hover:underline-offset-4", {
          "underline underline-offset-4": active,
        })}
      >
        {/* ll,l */}
      {/* {item.title} */}
      {/* </DynamicTag> */}
    </li>
  );
};
