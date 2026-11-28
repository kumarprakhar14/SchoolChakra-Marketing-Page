'use client';

import React, { useState, useMemo } from 'react';
import { Users, Search, UserPlus, Star } from 'lucide-react';
import type { DemoSchool, DemoTheme, DemoUser, UserRole } from '../types';
import { INITIAL_USERS, ROLE_CONFIG } from '../mockData';

interface UsersViewProps {
  school: DemoSchool;
  theme: DemoTheme;
}

export const UsersView: React.FC<UsersViewProps> = ({ school, theme }) => {
  const [users, setUsers] = useState<DemoUser[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = selectedRole === 'ALL' || u.role === selectedRole;
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.erpId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.details.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }, [users, selectedRole, searchQuery]);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  const roles: ('ALL' | UserRole)[] = ['ALL', 'ADMIN', 'TEACHER', 'STUDENT', 'ACCOUNTS'];
  const totalUserCount = school.students + school.teachers + 4;

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-2.5">
        <div className="flex items-center min-w-0">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mr-3 shadow-2xs border transition-colors shrink-0"
            style={{
              backgroundColor: theme.bg,
              color: theme.primary,
              borderColor: theme.border,
            }}
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 tracking-tight">
              User Management
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              Manage teachers, students, and staff
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-xl shadow-xs hover:shadow-md transition-all font-medium text-xs sm:text-sm cursor-pointer ml-auto sm:ml-0"
          style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.text})`,
          }}
        >
          <UserPlus className="w-4 h-4 mr-1.5" />
          Add User
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
        {/* Filters bar */}
        <div className="p-2.5 sm:p-3 border-b border-gray-100 flex flex-wrap gap-2.5 bg-gray-50/50 items-center justify-between">
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user or ERP ID..."
              className="w-full pl-8 sm:pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm outline-none shadow-2xs focus:border-blue-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar w-full sm:w-auto">
            {roles.map((r) => {
              const isSelected = selectedRole === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        {/* Users Table with Horizontal Scroll on Mobile */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30">
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  User
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  ERP ID
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Role
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Details
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-xs text-gray-400">
                    No users matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const rc = ROLE_CONFIG[u.role];
                  return (
                    <tr
                      key={u.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center text-gray-600 mr-2.5 sm:mr-3 shrink-0 text-xs font-bold">
                            {u.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900 hover:underline cursor-pointer text-xs sm:text-sm">
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-600 font-mono bg-gray-50 rounded-lg px-2 py-0.5 sm:py-1 border border-gray-100">
                          {u.erpId}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1 items-start">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border ${rc.bg} ${rc.text} ${rc.border}`}
                          >
                            {u.role}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold ${
                              u.active
                                ? 'bg-green-50 text-green-600 border border-green-100'
                                : 'bg-red-50 text-red-600 border border-red-100'
                            }`}
                          >
                            {u.active ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-500">{u.details}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1.5 items-center">
                          {u.isPrimary ? (
                            <span className="inline-flex items-center px-2 py-0.5 sm:py-1 bg-yellow-100 text-yellow-800 rounded text-[10px] font-semibold border border-yellow-200">
                              <Star className="w-3 h-3 fill-current mr-1 text-yellow-600" /> Primary
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="px-2 sm:px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-[10px] font-medium transition-colors cursor-pointer"
                              >
                                Archive
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleUserStatus(u.id)}
                                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                                  u.active
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                                }`}
                              >
                                {u.active ? 'Disable' : 'Enable'}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-2.5 sm:p-3 text-center border-t border-gray-100">
          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400">
            Showing {filteredUsers.length} of {totalUserCount} users • Infinite scroll pagination
          </span>
        </div>
      </div>
    </div>
  );
};
