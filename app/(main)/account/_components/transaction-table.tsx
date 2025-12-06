"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Trash,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/data/categories";
import { bulkDeleteTransactions } from "@/actions/accounts";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type TransactionType = "INCOME" | "EXPENSE";
type SortField = "date" | "amount" | "category";
type SortDirection = "asc" | "desc";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
} as const;

type RecurringInterval = keyof typeof RECURRING_INTERVALS;

export type Transaction = {
  id: string;
  date: string | Date;
  description?: string | null;
  category: string;
  amount: number;
  type: TransactionType;
  isRecurring: boolean;
  recurringInterval?: RecurringInterval | null;
  nextRecurringDate?: string | Date | null;
};

type TransactionTableProps = {
  transactions: Transaction[];
};

/* --------------- CONSTANTS --------------- */

const ITEMS_PER_PAGE = 10;

/* ✅✅✅ FIXED useFetch TYPING ✅✅✅ */
type DeleteResponse = {
  success: boolean;
};

/* ================= COMPONENT ================= */

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({
    field: "date",
    direction: "desc",
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "">("");
  const [recurringFilter, setRecurringFilter] = useState<
    "recurring" | "non-recurring" | ""
  >("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const router = useRouter();

  /* ---------------- FILTER + SORT ---------------- */

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.description?.toLowerCase().includes(searchLower)
      );
    }

    if (typeFilter) {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison =
            new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / ITEMS_PER_PAGE
  );

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTransactions, currentPage]);

  /* ---------------- HANDLERS ---------------- */

  const handleSort = (field: SortField) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (!checked) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedTransactions.map((t) => t.id));
    }
  };

  /* ✅✅✅ FULLY TYPED useFetch ✅✅✅ */
  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} transactions?`
      )
    )
      return;

    deleteFn(selectedIds);
  };

  useEffect(() => {
    if (deleted?.success && !deleteLoading) {
      toast.error("Transactions deleted successfully");
    }
  }, [deleted, deleteLoading]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedIds([]);
  };

  /* ================= JSX ================= */

  return (
    <div className="space-y-4">
      {deleteLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
      )}
      </div>
  );
}
