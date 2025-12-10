'use client'

import { User, UserRole } from "../../types/auth.types";
import { useEffect, useState, useMemo, useCallback, memo } from "react";
import MultipleSelectDropdown from "@/components/ui/MultipleSelectDropdown.component";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { userListApi } from "@/app/lib/userList.api";
import { UserListRequest } from "@/types/user.types";
import { useUserListQuery } from "@/hooks/userList.hook";
import { ManagerCreationDialog } from "@/components/dialogs/admin/ManagerCreationDialog.component";
import { useCurrentUserProfile } from "@/hooks/user.hook";
import { useLanguage } from "@/providers/language.provider";


export const AdminUserList = memo(function AdminUserList() {
    const { t } = useLanguage();

    const { data: currentUser, isLoading: loadingCurrentUser, error: currentUserError } = useCurrentUserProfile()

    const roomFloors = useMemo(() => ["1", "2", "3", "4", "5", "6", "7", "8", "9"], []);

    const [error, setError] = useState<Error | null>();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [sortBy, setSortBy] = useState<'Name' | 'Id' | 'Room'>('Name');
    const [roleFilter, setRoleFilter] = useState<UserRole | 'All'>('All');
    const [selectedRoomFloors, setSelectedRoomFloors] = useState<string[]>(roomFloors);
    const [selectedPaymentsStatuses, setSelectedPaymentsStatuses] = useState<'Paid' | 'Awaiting' | 'All' | 'Overdue'>('All');
    const [pagesCount, setPagesCount] = useState(1);
    const [page, setPage] = useState(1);
    const limit = useMemo(() => 10, []);

    const [showManagerCreationDialog, setShowManagerCreationDialog] = useState(false)
    const handleOpenManagerCreation = () => {
        setShowManagerCreationDialog(true)
    }
    const handleCloseManagerCreation = () => {
        setShowManagerCreationDialog(false)
    }

    const { data: userList, isLoading } = useUserListQuery({
        page,
        limit,
        role: roleFilter === 'All' ? undefined : roleFilter,
        paymentStatus: selectedPaymentsStatuses,
        roomFlor: selectedRoomFloors,
        sortBy
    })

    useEffect(() => {
        if (userList && userList.data && userList.data.length > 0) {
            setUsers([...userList.data])
        }
        setUsers(userList?.data || []);
        setPagesCount(userList?.pageCount || 1);
        setLoading(isLoading)
    }, [userList]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 border border-slate-200">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        <span className="ml-4 text-slate-700 font-medium text-lg">{t('admin.users.loading')}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 border border-red-200 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="text-center">
                        <div className="text-red-500 mb-4 animate-in zoom-in-50 duration-500 delay-150">
                            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2 animate-in fade-in duration-300 delay-200">{t('admin.users.errorLoading')}</h3>
                        <p className="text-slate-600 animate-in fade-in duration-300 delay-300">{t('admin.users.errorMessage')}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen px-6 py-6 bg-slate-50 flex flex-col overflow-hidden">
            {(currentUser && currentUser.role === 'SuperAdmin') && (
                <button
                    className={`  bg-blue-600 text-white border border-blue-800 rounded-xl px-5 py-2.5 text-lg font-medium shadow-md `}
                    onClick={handleOpenManagerCreation}
                >
                    {t('admin.users.createManager')}
                </button>
            )}
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500 flex-shrink-0">
                <div className="w-full px-6 py-6">
                    <div className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                        <h1 className="text-3xl font-bold text-slate-900">
                            {t('admin.users.title')}
                        </h1>
                        <p className="text-slate-600 mt-1">{t('admin.users.subtitle')}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500 delay-100 flex-shrink-0">
                <div className="w-full px-6 py-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">{t('admin.users.filters')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Sort By */}
                        <div className="space-y-2 delay-200">
                            <label className="block text-sm font-medium text-slate-700">
                                {t('admin.users.sortBy')}
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm  hover:shadow-md"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'Name' | 'Id' | 'Room')}
                            >
                                <option value='Name'>{t('admin.users.sortByName')}</option>
                                <option value='Id'>{t('admin.users.sortById')}</option>
                                <option value='Room'>{t('admin.users.sortByRoom')}</option>
                            </select>
                        </div>

                        {/* Role Filter */}
                        <div className="space-y-2 delay-250">
                            <label className="block text-sm font-medium text-slate-700">
                                {t('admin.users.userType')}
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm  hover:shadow-md"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value as UserRole)}
                            >
                                <option value='All'>{t('admin.users.allUsers')}</option>
                                <option value='SignedInUser'>{t('admin.users.nonResidents')}</option>
                                <option value='Regular'>{t('admin.users.regular')}</option>
                            </select>
                        </div>

                        {/* Room Floor */}
                        <div className="space-y-2 delay-300">
                            <label className="block text-sm font-medium text-slate-700">
                                {t('admin.users.roomFloor')}
                            </label>
                            <div className="w-full">
                                <MultipleSelectDropdown
                                    dropdownHeader={t('admin.users.selectFloors')}
                                    formFieldName="floor"
                                    options={roomFloors}
                                    onChange={(roomFloors) => {
                                        setSelectedRoomFloors(roomFloors);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="space-y-2 delay-350">
                            <label className="block text-sm font-medium text-slate-700">
                                {t('admin.users.paymentStatus')}
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm  hover:shadow-md"
                                value={selectedPaymentsStatuses}
                                onChange={(e) => setSelectedPaymentsStatuses(e.target.value as 'Paid' | 'Awaiting' | 'All' | 'Overdue')}
                            >
                                <option value='All'>{t('admin.users.allStatuses')}</option>
                                <option value='Paid'>{t('admin.users.paid')}</option>
                                <option value='Awaiting'>{t('admin.users.awaiting')}</option>
                                <option value='Overdue'>{t('admin.users.overdue')}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="w-full px-6 py-8 flex-1 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Users ({users.length} found)
                        </h2>
                    </div>

                    {users.length === 0 ? (
                        <div className="p-12 text-center animate-in fade-in-0 zoom-in-50 duration-500">
                            <div className="text-slate-300 mb-4">
                                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('admin.users.noUsersFound')}</h3>
                            <p className="text-slate-600">{t('admin.users.noUsersMessage')}</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-200">
                            {users.map((user, index) => (
                                <Link key={user.id} href={`/admin/users/${user.id}`}>
                                    <div
                                        className="px-6 py-4 hover:bg-slate-50  cursor-pointer hover:scale-[1.01] hover:shadow-sm"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-12 w-12 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
                                                            {user.picture ? (
                                                                <img
                                                                    src={user.picture}
                                                                    className="w-full h-full object-cover"
                                                                    alt={`${user.displayName} ${user.secondName}`}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <span className="text-sm font-medium text-blue-800">
                                                                        {user.displayName?.charAt(0)}{user.secondName?.charAt(0)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-base font-semibold text-slate-900 truncate">
                                                            {user.displayName} {user.secondName}
                                                        </p>
                                                        <p className="text-sm text-slate-500 truncate">
                                                            {user.email}
                                                        </p>
                                                        <div className="flex items-center mt-1 space-x-2">
                                                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                                ID: {user.id}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0">
                                                <div className="flex items-center text-slate-400 hover:text-blue-600 transition-colors duration-200">
                                                    <svg className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pagesCount > 1 && (
                    <div className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-sm text-slate-700 mb-4 sm:mb-0">
                                    Page {page} of {pagesCount}
                                </div>
                                <div className="flex flex-wrap justify-center sm:justify-end gap-1">
                                    <button
                                        onClick={() => setPage(Math.max(1, page - 1))}
                                        disabled={page === 1}
                                        className="px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-l-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed  hover:scale-105"
                                    >
                                        {t('admin.users.pagination.previous')}
                                    </button>

                                    {Array.from({ length: Math.min(pagesCount, 5) }, (_, i) => {
                                        let pageNum;
                                        if (pagesCount <= 5) {
                                            pageNum = i + 1;
                                        } else if (page <= 3) {
                                            pageNum = i + 1;
                                        } else if (page >= pagesCount - 2) {
                                            pageNum = pagesCount - 4 + i;
                                        } else {
                                            pageNum = page - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`px-4 py-2 text-sm font-medium border  hover:scale-105 ${page === pageNum
                                                        ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-md'
                                                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => setPage(Math.min(pagesCount, page + 1))}
                                        disabled={page === pagesCount}
                                        className="px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-r-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed  hover:scale-105"
                                    >
                                        {t('admin.users.pagination.next')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {(currentUser && currentUser.role === 'SuperAdmin' && showManagerCreationDialog) && (
                <ManagerCreationDialog
                    open={showManagerCreationDialog}
                    onClose={handleCloseManagerCreation}
                />
            )}
        </div>
    )
})