// types/tables.ts
import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

// Existing types remain the same
export interface TableConfig<T> {
  defaultFilters?: Record<string, any>;
  defaultSort?: SortConfig;
  pageSize?: number;
}

export interface ColumnConfig<T> {
  id: keyof T | string;
  header: string;
  accessor?: (row: T) => any;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export type SortDirection = 'asc' | 'desc' | '';

export interface TableState {
  page: number;
  pageSize: number;
  filters: Record<string, any>;
  sort: SortConfig;
}

// Updated BaseTableProps to include toolbarContent
export interface BaseTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  totalPages: number;
  pageSize: number;
  currentPage: number;
  isLoading?: boolean;
  isFetching?: boolean;
  enableRowSelection?: boolean;
  enableMultiSort?: boolean;
  enableColumnFilters?: boolean;
  enableGlobalFilter?: boolean;
  toolbarContent?: ReactNode;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortChange: (field: string, direction: SortDirection) => void;
  onFilterChange: (filters: Record<string, any>) => void;
  onRowSelectionChange?: (rows: T[]) => void;
}

// Updated DataTableProps
export interface DataTableProps<T>
  extends Omit<
    BaseTableProps<T>,
    | 'data'
    | 'totalPages'
    | 'isLoading'
    | 'isFetching'
    | 'currentPage'
    | 'onPageChange'
    | 'onPageSizeChange'
    | 'onSortChange'
    | 'onFilterChange'
  > {
  queryKey: string;
  fetchData: (params: TableState) => Promise<TableResponse<T>>;
  initialState?: Partial<TableState>;
  toolbarContent?: ReactNode;
}

export interface TableResponse<T> {
  data: T[];
  totalPages: number;
  totalRows?: number;
}

export type RowSelectionProps = {
  indeterminate?: boolean;
};
