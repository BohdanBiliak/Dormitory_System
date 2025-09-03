'use client'

export function AdminNewAnnouncement(){


    return(
        <div className="mx-auto min-w-full h-full bg-white flex-1 align-top">
            <div className="flex flex-row flex-nowrap w-full h-5/6 gap-x-5 mx-auto pb-5">
                {/*Announcement*/}
                <div className="w-4/5 h-full border-blue-600 border flex flex-col">
                    {/*Header*/}
                    <div className="w-full h-1/12 border-blue-800 border-2 drop-shadow text-3xl font-semibold">Announcement</div>
                    <div className="w-full h-1/12 border-blue-600 border-b text-2xl">
                        <input type="text" placeholder="Announcement title" className="w-full h-full" />
                    </div>
                    <div className="w-full grow">
                        <textarea className="w-full h-full" placeholder="Announcement description" />
                    </div>
                    <div className="w-full h-fit align-bottom bg-gray-300">
                        <ul>
                            <li>List of files</li>
                        </ul>
                    </div>
                </div>

                {/*Addresses*/}
                <div className="w-1/5 h-full border-blue-600 border flex flex-col">
                    <div className="w-full border-blue-800 border-2 drop-shadow text-3xl">Addresses</div>
                    <div className="w-full grow">
                        {/*List of addresses*/}
                    </div>
                    <div className="w-full my-2">
                        <button className=" bg-blue-800 text-white flex flex-row items-center px-3 mx-auto">
                            <img src="/plus.svg" alt="Add addresse" className="h-8 w-8" />
                            <label>Add</label>
                        </button>
                    </div>
                </div>
            </div>
                {/*Control bar*/}
            <div className="w-full h-1/6 border flex flex-1 items-center">
                <div className="border-black border-2 text-2xl h-1/3 content-center mx-auto w-2/6">Expiration date:</div>
                <button className="bg-blue-800 flex flex-row items-center px-2 h-1/3 content-center w-1/6 mx-auto">
                    <img src="/paperclip.svg" alt='' className="h-10 w-10" />
                    <label>Link file</label>
                </button>
                <button className="bg-gray-500 items-center px-2 h-1/3 content-center mx-auto border-black border w-1/12">
                    <label>Cancel</label>
                </button>
                <button className="bg-blue-800 items-center px-2 h-1/3 content-center mx-auto border-black border w-1/12">
                    <label>Post</label>
                </button>
            </div>
        </div>
    )
}