import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/accounts";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AccountPage({ params }: PageProps) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  // Transform all transactions to match the expected types
  const formattedTransactions = transactions.map(transaction => ({
    ...transaction,
    description: transaction.description || "",
    amount: Number(transaction.amount),
    date: transaction.date,
    recurringInterval: transaction.recurringInterval || undefined,
    nextRecurringDate: transaction.nextRecurringDate || undefined,
    receiptUrl: transaction.receiptUrl || undefined
  }));

  // Safely handle balance
  const balance = account.balance !== undefined 
    ? typeof account.balance === 'number' 
      ? account.balance.toString() 
      : String(account.balance)
    : "0";

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={formattedTransactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={formattedTransactions} />
      </Suspense>
    </div>
  );
}