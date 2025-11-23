import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export type Scadentar = {
  NrCrt: number
  Data: string
  Principal: string
  Dobanda: string
  Total: string
  Comisioane: string
  Rata: string
  Sold: string,
}

const data:  Scadentar: [
  {NrCrt: 1},
  {Data: "0"},
  {Principal: "0"},
  {Dobanda: "0"},
  {Total: "0"},
  {Comisioane: "0"},
  {Rata: "0"},
  {Sold: "0"},
]

const rambursare = () => {
  return (
    <div>
      <Table className="border border-solid rounded-md p-5">
        <TableCaption>Scadentar</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Scadentar.map((u: { NrCrt: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; Data: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; Principal: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; Dobanda: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; Total: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; Comisioane: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; Rata: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; Sold: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <TableRow>
            <TableCell className="font-medium">{u.NrCrt}</TableCell>
            <TableCell>{u.Data}</TableCell>
            <TableCell>{u.Principal}</TableCell>
            <TableCell>{u.Dobanda}</TableCell>
            <TableCell>{u.Total}</TableCell>
            <TableCell>{u.Comisioane}</TableCell>
            <TableCell>{u.Rata}</TableCell>
            <TableCell>{u.Sold}</TableCell>
          </TableRow>
          ))},
        </TableBody>
      </Table>
    </div>
  );
};

export default rambursare;
