
import { getFriendsList } from "@/actions/friends";
import DashboardClient from "@/components/dashboardClient";

export default async function DashboardPage() {
  const friends = await getFriendsList();

  return (
    <DashboardClient friends={friends} />
  );
}
