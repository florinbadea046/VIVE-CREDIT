import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// const principal =
// const rata = (principal + dobanda + comisioane);
// const dobandaPrincipal = dobanda + principal;
// const sold = rata - 1;

const rambursare = () => {
  return (
    <div>
      <div>
        <label className="">Valoare credit</label>
        <input
          className="border border-solid rounded-lg"
          type="number"
          name="number"
          id="number"
        ></input>

        <label className="">Durata credit</label>
        <input
          className="border border-solid rounded-lg"
          type="number"
          name="number"
          id="number"
        ></input>
        <label className="">Dobanda</label>
        <input
          className="border border-solid rounded-lg"
          type="number"
          name="number"
          id="number"
        ></input>
        <label className="">Comisioane</label>
        <input
          className="border border-solid rounded-lg"
          type="number"
          name="number"
          id="number"
        ></input>
        <label className="">Total</label>
        <input
          className="border border-solid rounded-lg"
          type="number"
          name="number"
          id="number"
        ></input>
      </div>
      <div>
        <Table className="mt-10 mx-4 border border-solid">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right w-[1px]">Nr crt</TableHead>
              <TableHead className="text-right w-[20px]">Data</TableHead>
              <TableHead className="text-right w-[20px]">Principal</TableHead>
              <TableHead className="text-right w-[20px]">Dobanda</TableHead>
              <TableHead className="text-right w-[20px] ">
                Dobanda + Principal
              </TableHead>
              <TableHead className="text-right w-[20px]">Comisioane</TableHead>
              <TableHead className="text-right w-[20px]">Rata</TableHead>
              <TableHead className="text-right w-[20px]">Sold Credit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-right">001</TableCell>
              <TableCell className="text-right">zz-ll-aaaa</TableCell>
              <TableCell className="text-right">suma</TableCell>
              <TableCell className="text-right">9.5%</TableCell>
              <TableCell className="text-right">a+b</TableCell>
              <TableCell className="text-right">5</TableCell>
              <TableCell className="text-right">rata</TableCell>
              <TableCell className="text-right">sold</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default rambursare;
