import React from "react";
import { auth } from "@/auth";
import DashboardClient from "./DashboardClient";
import { getDashboardStats } from "@/actions/dashboard";

export default async function AdminPage() {
	const session = await auth();
	const stats = await getDashboardStats();

	if (!stats) {
		// Fallback data if fetch fails or unauthorized (though middleware should handle auth)
		return (
			<DashboardClient
				session={session}
				kpi={{}}
				reviewSolvedRate={0}
				recentQueue={[]}
			/>
		);
	}

	return (
		<DashboardClient
			session={session}
			kpi={stats.kpi}
			reviewSolvedRate={stats.reviewSolvedRate}
			recentQueue={stats.recentQueue}
		/>
	);
}
