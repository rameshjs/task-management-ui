import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">You are logged in.</p>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
