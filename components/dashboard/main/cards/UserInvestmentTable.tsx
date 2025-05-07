'use client';

import {
  type SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import type { UserInvestmentRow } from '../interfaces';

type BadgeVariant =
  | 'outline'
  | 'funds-received'
  | 'invested'
  | 'voided'
  | 'distributed'
  | 'pending'
  | 'withdrawn'
  | 'default'
  | 'secondary'
  | 'destructive';

// Helper function to format currency
const usdCurrencyFormat = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export enum InvestmentStatusEnum {
  FundsReceived = 'Funds Received',
  FundsNotReceived = 'Funds Not Received',
  VoidedRefunded = 'Voided / Refunded',
  Invested = 'Invested',
  Completed = 'Completed',
  Chargeback = 'Chargeback',
  None = 'Not Completed',
  PaymentFailed = 'Payment Failed'
}

interface UserInvestmentTableProps {
  tableData: UserInvestmentRow[];
  isLoading?: boolean;
}

export default function UserInvestmentTable({
  tableData,
  isLoading = false
}: UserInvestmentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<UserInvestmentRow[]>([]);

  const columnHelper = createColumnHelper<UserInvestmentRow>();

  const columns = [
    columnHelper.accessor('offeringId', {
      id: 'offeringId',
      header: () => 'OFFERING',
      cell: (info) => (
        <div className="font-medium text-zinc-900 dark:text-white">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('dateLastUpdate', {
      id: 'dateLastUpdate',
      header: () => 'DATE',
      cell: (info) => (
        <div className="font-medium text-zinc-900 dark:text-white">
          {moment(info.getValue()).tz('America/New_York').format('MM/DD/YYYY')}
        </div>
      )
    }),
    columnHelper.accessor('totalShares', {
      id: 'totalShares',
      header: () => 'SHARES',
      cell: (info) => (
        <div className="font-medium text-zinc-900 dark:text-white">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('paymentMethod', {
      id: 'paymentMethod',
      header: () => 'PAYMENT METHOD',
      cell: (info) => (
        <div className="font-medium text-zinc-900 dark:text-white">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('amount', {
      id: 'amount',
      header: () => 'AMOUNT',
      cell: (info) => (
        <div className="font-semibold text-zinc-900 dark:text-white">
          {usdCurrencyFormat(info.getValue())}
        </div>
      )
    }),
    columnHelper.accessor('transactionFundStatus', {
      id: 'transactionFundStatus',
      header: () => 'STATUS',
      cell: (info) => {
        const status = info.getValue();
        let variant = 'outline';

        switch (status) {
          case InvestmentStatusEnum.FundsReceived:
            variant = 'funds-received';
            break;
          case InvestmentStatusEnum.Invested:
            variant = 'invested';
            break;
          case InvestmentStatusEnum.VoidedRefunded:
            variant = 'voided';
            break;
          case InvestmentStatusEnum.Completed:
            variant = 'distributed';
            break;
          case InvestmentStatusEnum.FundsNotReceived:
          case InvestmentStatusEnum.None:
            variant = 'pending';
            break;
          case InvestmentStatusEnum.Chargeback:
          case InvestmentStatusEnum.PaymentFailed:
            variant = 'withdrawn';
            break;
          default:
            variant = 'outline';
        }

        return <Badge variant={variant as BadgeVariant}>{status}</Badge>;
      }
    })
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  });

  useEffect(() => {
    if (tableData) {
      setData(tableData);
    }
  }, [tableData]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽'
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No investments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing{' '}
            <span className="font-medium">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </span>{' '}
            of{' '}
            <span className="font-medium">
              {table.getFilteredRowModel().rows.length}
            </span>{' '}
            investments
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
