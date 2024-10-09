// import { Checkbox } from "@/components/ui/checkbox";
// import { FormControl, FormField, FormLabel } from "@/components/ui/form";
// import { UseFormReturn } from "react-hook-form";
// import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
// import { CandidateFilterItem } from "@/lib/constants/filters/candidatesFilter";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";

// export type FilterInputType = CandidateFilterItem["filterType"];

// const FilterInput = ({
//   item,
//   form,
// }: {
//   item: CandidateFilterItem;
//   form: UseFormReturn<CandidateFilters, any, undefined>;
// }) => {
//   const renderInput = (inputType: any) => {
//     if (inputType.filterType === "checkbox") {
//       return (
//         <>
//           <FormField
//             control={form.control}
//             name={item.query}
//             render={({ field }) => (
//               <>
//                 {item.options.map((option) => (
//                   <div
//                     key={crypto.randomUUID()}
//                     className="flex w-1/2 items-center space-x-1"
//                   >
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value?.includes(option.slug)}
//                         onCheckedChange={(checked) => {
//                           checked
//                             ? field.onChange([...field.value, option.slug])
//                             : field.onChange(
//                                 field.value?.filter(
//                                   (value) => value !== option.slug,
//                                 ),
//                               );
//                         }}
//                         id={option.name}
//                         className="h-4 w-4 data-[state=checked]:border-0 data-[state=unchecked]:border-border "
//                       />
//                     </FormControl>
//                     <FormLabel
//                       htmlFor={option.name}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {option.name}
//                     </FormLabel>
//                   </div>
//                 ))}
//               </>
//             )}
//           />
//         </>
//       );
//     }
//     if (item.filterType === "select") {
//       return (
//         <>
//           <FormField
//             control={form.control}
//             name={item.query}
//             render={({ field }) => (
//               <>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger className="w-full bg-inherit placeholder:text-[#A9A9A9] md:w-1/2">
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {item.options.map((option) => (
//                       <SelectItem key={crypto.randomUUID()} value={option.slug}>
//                         {option.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </>
//             )}
//           />
//         </>
//       );
//     }
//     if (item.filterType === "textbox")
//       // return <Input type="text" className="h-auto px-4 py-2" />;
//       return (
//         <FormField
//           control={form.control}
//           name={item.query}
//           render={({ field }) => (
//             <FormControl>
//               <Input placeholder="shadcn" {...field} />
//             </FormControl>
//           )}
//         />
//       );
//     if (item.filterType === "salary range") return <p>salary range</p>;
//     return <h1>Invalid filterType</h1>;
//   };
//   return <div className="flex flex-wrap gap-y-4">{renderInput(item)}</div>;
// };

// export default FilterInput;
