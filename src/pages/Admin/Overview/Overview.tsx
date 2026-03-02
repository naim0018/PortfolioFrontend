import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetUsersQuery, useGetTemplatesQuery, useGetPortfoliosQuery } from "@/store/Api/portfolio.api";
import { useGetMeQuery } from "@/store/Api/Auth.api";
import { Users, Layout, FileText, Activity, Eye, Download, Code } from "lucide-react";

const Overview = () => {
    const userProfile = useSelector((state: RootState) => state.auth.user);
    const isAdmin = userProfile?.role === "admin";

    // Admin Queries (only run if admin)
    const { data: usersResp } = useGetUsersQuery(undefined, { skip: !isAdmin });
    const { data: templatesResp } = useGetTemplatesQuery(undefined, { skip: !isAdmin });
    const { data: portfoliosResp } = useGetPortfoliosQuery(undefined, { skip: !isAdmin });

    // User Queries (only run if user)
    const { data: meResp } = useGetMeQuery(undefined, { skip: isAdmin });

    const adminStats = [
        { 
            label: "Total Users", 
            value: usersResp?.data?.length || 0, 
            icon: <Users className="text-blue-600" />,
            color: "bg-blue-50" 
        },
        { 
            label: "Active Templates", 
            value: templatesResp?.data?.length || 0, 
            icon: <Layout className="text-purple-600" />,
            color: "bg-purple-50" 
        },
        { 
            label: "Portfolios Created", 
            value: portfoliosResp?.data?.length || 0, 
            icon: <FileText className="text-emerald-600" />,
            color: "bg-emerald-50" 
        },
    ];

    const userStats = [
        { 
            label: "Profile Views", 
            value: meResp?.data?.profileViews || 0, 
            icon: <Eye className="text-blue-600" />,
            color: "bg-blue-50" 
        },
        { 
            label: "Resume Downloads", 
            value: meResp?.data?.resumeDownloads || 0, 
            icon: <Download className="text-purple-600" />,
            color: "bg-purple-50" 
        },
        { 
            label: "Portfolio Projects", 
            value: (meResp?.data as any)?.projects?.length || 0, 
            icon: <Code className="text-emerald-600" />,
            color: "bg-emerald-50" 
        },
    ];

    const stats = isAdmin ? adminStats : userStats;

    return (
        <div className="admin-dark max-w-7xl mx-auto space-y-8 p-6">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-brand-600 flex items-center justify-center rounded-xl text-white shadow-lg shadow-brand-100">
                    <Activity size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">
                        {isAdmin ? "Platform Overview" : "Your Dashboard"}
                    </h2>
                    <p className="text-slate-500 font-medium">Welcome back, {userProfile?.userName || userProfile?.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                        <div className={`h-14 w-14 ${stat.color} flex items-center justify-center rounded-2xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    <p className="text-slate-500">
                        {isAdmin 
                            ? "System is stable. All services are currently online." 
                            : "Your portfolio is live and reaching potential employers."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
