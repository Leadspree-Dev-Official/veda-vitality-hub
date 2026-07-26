import { createFileRoute } from "@tanstack/react-router";
import { AdminConsole } from "@/components/brand-demo/AdminConsole";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  return <AdminConsole />;
}
