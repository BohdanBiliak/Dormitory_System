'use client'

import React, {useEffect, useState} from "react";
import {useAnnouncements} from "@/hooks/announcements.hook";
import Link from "next/link";
import {router} from "next/client";
import {Announcement} from "@/types/announcements.types";
import {announcementsApi} from "@/app/lib/announcements.api";



export function AdminAnnouncementList(){
    const [showHidden, setShowHidden] = React.useState(false);
    const [showExpired, setShowExpired] = React.useState(false);
    const [page, setPage] = useState(1);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const limit = 10;

    const {getAnnouncements} = useAnnouncements();

    const handleChangeShowExpired = (): void => {setShowExpired(!showExpired); updateAnnouncementList()};
    const handleChangeShowHidden = (): void => {setShowHidden(!showHidden); updateAnnouncementList()};



    const updateAnnouncementList = ()=>{
        const announcements = getAnnouncements({showHidden:showHidden, showExpired:showExpired,page:page,limit:limit});
        if(!announcements.isLoading && !announcements.isError && announcements){
            setAnnouncements(announcements.data?.data || [])
        }
    }

    const {data: announcementsList, isLoading, error} = getAnnouncements({
         showHidden,
         showExpired,
         page,
         limit
    })

    // useEffect(() => {
    //     const newAnnouncementsList = getAnnouncements({showHidden:showHidden, showExpired:showExpired,page:page,limit:limit})
    //     if(newAnnouncementsList.data){
    //         setAnnouncements(newAnnouncementsList.data.data);
    //     }
    // }, [showHidden, showExpired]);

    console.log("showExpired ", showExpired);
    console.log("showHidden:", showHidden);
    console.log("announcements:", announcements);

    const totalPages = announcementsList?.pagination?.totalPages || 1

    if (isLoading) {
        return (
            <div className="bg-white border border-gray-300 rounded-lg p-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                    <span className="ml-2">Loading announcements list...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white border border-gray-300 rounded-lg p-8">
                <div className="text-center text-red-600">
                    <p>Error loading announcements list. Please try again.</p>
                </div>
            </div>
        )
    }

    return(
        <div className="mx-auto min-w-full bg-white border-2 border-blue-300 flex flex-col align-top ">
            {/*Header*/}
            <div className="w-full">
                <div className="">Announcements</div>
                <div className="flex flex-row">
                    <Link className="bg-blue-800 text-white drop-shadow" href="/admin/announcements/new-announcement">New Announcement</Link>
                    <div className="flex flex-row">
                        <label className="flex flex-row border-black border rounded"> <input type="checkbox" onClick={handleChangeShowHidden}/><span className="select-none">Show Hidden</span></label>
                        <label className="flex flex-row border-black border rounded"> <input type="checkbox" onClick={handleChangeShowExpired}/><span className="select-none">Show Expired</span></label>
                    </div>
                </div>
            </div>

            {/*List*/}
            <div className="w-full grow">
                <table className="w-full table-fixed border-collapse">
                    <thead>
                    <tr>
                        <th className="w-1/6">Posting Date</th>
                        <th>Title</th>
                        <th className="w-1/6">Expiration Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {announcements.map((announcement, index) => (
                        <tr key={index}>
                            <td className="border border-black">{announcement.postedAt}</td>
                            <td className="border border-black"><Link href={`/admin/announcement/${announcement.id}`} >{announcement.title}</Link></td>
                            <td className="border border-black">{announcement.expiresAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
                <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`px-3 py-1 border rounded text-sm transition-colors ${
                                page === pageNum
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}