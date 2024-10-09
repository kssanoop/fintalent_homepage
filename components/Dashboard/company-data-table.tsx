import { CardIcon, CardIconFallback, CardIconImage } from "../ui/cardslogo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const CompanyDataTable = () => {
  const tableRows = [
    { id: 1, label: "Company" },
    { id: 2, label: "No. of recruiters" },
    { id: 3, label: "Jobs posted" },
    { id: 4, label: "Candidates hired" },
    { id: 5, label: "Profile views" },
    { id: 6, label: "Revenue generated" },
  ];

  const demoData = [
    {
      id: 1,
      company: "ABC",
      recruiter: 12,
      jobs: 12,
      candidates: 12,
      profile: 12,
    },
    {
      id: 2,
      company: "ABC1",
      recruiter: 13,
      jobs: 11,
      candidates: 12,
      profile: 12,
    },
    {
      id: 3,
      company: "ABC3",
      recruiter: 13,
      jobs: 11,
      candidates: 12,
      profile: 12,
    },
    {
      id: 4,
      company: "ABC3",
      recruiter: 13,
      jobs: 11,
      candidates: 12,
      profile: 12,
    },
    {
      id: 5,
      company: "ABC4",
      recruiter: 13,
      jobs: 11,
      candidates: 12,
      profile: 12,
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableRows.map((item) => (
            <TableHead
              key={item.id}
              className=" text-sm font-bold text-[#5E5E5E]"
            >
              {item.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {demoData.map((item) => (
          <TableRow
            key={crypto.randomUUID()}
            className="text-sm font-medium text-[#5E5E5E]"
          >
            <TableCell className="text-sm font-bold text-[#171717]">
              <div className="flex items-center gap-2">
                <CardIcon className="h-8 w-8">
                  <CardIconImage src="https://github.com/shadcn.png" />
                  <CardIconFallback>Cn</CardIconFallback>
                </CardIcon>
                {item.company}
              </div>
            </TableCell>
            <TableCell
              className="text-sm font-medium text-[#5E5E5E]"
              key={crypto.randomUUID()}
            >
              {item?.recruiter}
            </TableCell>
            <TableCell className="font-medium" key={crypto.randomUUID()}>
              {item?.jobs}
            </TableCell>
            <TableCell className="font-medium" key={crypto.randomUUID()}>
              {item?.candidates}
            </TableCell>
            <TableCell className="font-medium" key={crypto.randomUUID()}>
              {item?.profile}
            </TableCell>
            <TableCell className="font-medium" key={crypto.randomUUID()}>
              {item?.jobs}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompanyDataTable;
