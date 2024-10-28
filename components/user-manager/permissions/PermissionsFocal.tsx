import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface PermissionsFocalProps {
  className?: string;
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Unpaid",
    totalAmount: "$320.00",
    paymentMethod: "Cash",
  },
  {
    invoice: "INV009",
    paymentStatus: "Paid",
    totalAmount: "$50.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV010",
    paymentStatus: "Unpaid",
    totalAmount: "$8520.00",
    paymentMethod: "PayPal",
  },
];

export const PermissionsFocal = ({ className }: PermissionsFocalProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex gap-1 items-center">
          <CircleCheckBig />
          Permissions
        </CardTitle>
        <CardDescription>
          This entity allows manager to view, assign, or modify permissions to
          control access to specific actions within the system
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="w-1/2">
          <Input className="w-fit my-5" placeholder="Type to search..."/>
          <div className="rounded-md border max-h-[50vh] overflow-y-auto">
            <Table>
              <TableHeader className="bg-white">
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Permission Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell>
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell>
                      <p>{(new Date()).toUTCString()}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size={"sm"}>Save</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
