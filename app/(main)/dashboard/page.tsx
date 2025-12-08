import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

// Define types for your data
interface Account {
  id: string;
  name: string;
  type: string;
  balance: string | number;
  isDefault: boolean;
  // Add other account properties as needed
}

interface Transaction {
  id: string;
  amount: number;
  type: string;
  date: Date;
  description?: string;
  // Add other transaction properties as needed
}

interface BudgetData {
  budget: {
    id: string;
    userId: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  currentExpenses: number;
}

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const typedAccounts: Account[] = accounts || [];
  const typedTransactions: Transaction[] = transactions || [];

  const defaultAccount = typedAccounts.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData: BudgetData | null = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budalue?.currentExpenses || 0}
      />

      {/* Dashboard Overview */}
      <DashboardOverview
        accounts={typedAccounts}
        transactions={typedTransactions}
      />

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {typedAccounts.length > 0 &&
          typedAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}