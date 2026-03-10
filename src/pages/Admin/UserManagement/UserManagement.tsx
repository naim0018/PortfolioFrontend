import { useGetUsersQuery, useUpdateUserRoleMutation } from "@/store/Api/portfolio.api";
import { useState } from "react";
import { toast } from "sonner";
import { User, Shield, Check } from "lucide-react";

const UserManagement = () => {
  const { data: usersResponse, isLoading } = useGetUsersQuery();
  const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("user");

  const users = usersResponse?.data || [];

  const handleRoleUpdate = async (id: string) => {
    try {
      const result = await updateRole({ id, role: selectedRole }).unwrap();
      if (result.success) {
        toast.success("User role updated successfully!");
        setEditingUserId(null);
      }
    } catch  {
      toast.error("Failed to update role");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-8 pt-0">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground border-l-4 border-brand-600 pl-4">
          User Management
        </h2>
        <p className="mt-2 text-slate-500">
          Manage user roles and permissions across the platform.
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-muted/30">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Template
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {users.map((user: any) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-brand-100 text-brand-700 flex items-center justify-center rounded-full font-bold uppercase">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-foreground">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user._id ? (
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="block w-36 pl-3 pr-10 py-2 bg-background border border-border focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <div className="flex items-center gap-2">
                        {user.role === "admin" ? (
                          <Shield className="w-4 h-4 text-brand-600" />
                        ) : (
                          <User className="w-4 h-4 text-slate-400" />
                        )}
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin" ? "bg-brand-100 text-brand-800" :
                          "bg-slate-100 text-slate-800"
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {user.selectedTemplate ? (
                      <span className="text-brand-600 font-medium">Selected</span>
                    ) : (
                      <span className="text-slate-300">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingUserId === user._id ? (
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleRoleUpdate(user._id)}
                          disabled={isUpdating}
                          className="text-white bg-brand-600 hover:bg-brand-700 font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" /> Save
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingUserId(user._id);
                          setSelectedRole(user.role);
                        }}
                        className="text-brand-600 hover:text-brand-900 font-semibold transition-colors"
                      >
                        Edit Role
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
