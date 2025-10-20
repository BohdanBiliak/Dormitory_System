import {Camera, ChevronLeft, ChevronRight} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";

export interface ImageCarouselProps {
    photos:string[],
    setPhotos?: (photos: string[]) => void,
    newPhotos: File[],
    setNewPhotos?: (newPhotos: File[]) => void,
    showEditMenu: boolean,
    closeEditMenu: () => void,
    editionMenuLabels: {
        title: string,
        description: string
    }
    //handleSave?: ()=>void

}

export function ImageCarouselComponent({photos, setPhotos, newPhotos, setNewPhotos, showEditMenu, closeEditMenu, editionMenuLabels}:ImageCarouselProps) {
    const[photosTemp, setPhotosTemp] = useState(photos);
    const[newPhotosTemp, setNewPhotosTemp] = useState(newPhotos);


    const[currentIndex, setCurrentIndex] = useState(0);
    const[currentEditIndex, setCurrentEditIndex] = useState(0);
    const goToNext = () => {
        if(showEditMenu){
            if(currentEditIndex === photosTemp.length+newPhotosTemp.length-1){
                setCurrentEditIndex(0)
            }else{
                setCurrentEditIndex(currentEditIndex+1)
            }
        }else{
            if(currentIndex === photos.length+newPhotos.length-1){
                setCurrentIndex(0)
            }else{
                setCurrentIndex(currentIndex+1)
            }
        }
    }
    const goToPrevious = () => {
        if(showEditMenu){
            if(currentEditIndex === 0){
                setCurrentEditIndex(photosTemp.length+newPhotosTemp.length-1);
            }else{
                setCurrentEditIndex(currentEditIndex-1)
            }
        }else{
            if(currentIndex === 0){
                setCurrentIndex(photos.length+newPhotos.length-1);
            }else{
                setCurrentIndex(currentIndex-1)
            }
        }
    }

    const addRoomImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        console.log("Add room Image")
        if(files && setNewPhotosTemp){
            setNewPhotosTemp([...newPhotosTemp, files[0]]);
        }
    }

    const handleDeleteRoomPhoto = () => {

    }

    const handleRemovePhoto = (e:React.MouseEvent<HTMLButtonElement>) => {
        const {name, value} = e.currentTarget

        if(name==="removePhoto"){
            if(currentEditIndex.toString() === value){
                goToPrevious();
            }
            setPhotosTemp(photosTemp.filter(((_,index) => index.toString() !== value)))
        }else if(name==="removeNewPhoto"){
            if((currentEditIndex-photosTemp.length).toString() === value){
                goToPrevious();
            }
            setNewPhotosTemp(newPhotosTemp.filter(((_,index) => index.toString() !== value)))
        }
    }

    const handleSaveChanges = (e: React.MouseEvent<HTMLButtonElement>)=>{
        if(setNewPhotos) setNewPhotos(newPhotosTemp);
        if(setPhotos)  setPhotos(photosTemp);
    }

    const handleCancelChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPhotosTemp(photos);
        setNewPhotosTemp(newPhotos);
    }

    const closeEdit = () => {
        setCurrentIndex(0);
        closeEditMenu();
    }

    useEffect(() => {
        setCurrentIndex(0);
    }, [showEditMenu]);

    return(
        <div>
            <div className="p-6">
                {photos.length+newPhotos.length> 0 ? (
                    <div className="space-y-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 group">
                            <img
                                key={currentIndex}
                                src={showEditMenu?
                                    (photos.length > 0 ? photos[0]: URL.createObjectURL(newPhotos[0]))
                                    : currentIndex < photos.length ?
                                        photos[currentIndex]
                                        : URL.createObjectURL(newPhotos[currentIndex-photos.length])}
                                alt={`Room photo ${currentIndex + 1}`}
                                className="w-full h-full object-cover transition-all duration-500 ease-out animate-in fade-in-0 zoom-in-95"
                            />

                            {/* Navigation arrows */}
                            {photos.length+newPhotos.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                                    >
                                        <ChevronLeft size={20} className="transition-transform duration-200 hover:-translate-x-0.5" />
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                                    >
                                        <ChevronRight size={20} className="transition-transform duration-200 hover:translate-x-0.5" />
                                    </button>
                                </>
                            )}

                            {/* Image counter */}
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100">
                                {currentIndex + 1} / {photos.length+newPhotos.length}
                            </div>
                        </div>

                        {/* Dots indicator */}
                        {photos.length+newPhotos.length > 1 && (
                            <div className="flex justify-center gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
                                {photosTemp.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                                            index === currentIndex
                                                ? 'bg-blue-600 scale-110'
                                                : 'bg-slate-300 hover:bg-slate-400'
                                        }`}
                                    />
                                ))}
                                {newPhotos.map((_, index) => (
                                    <button
                                        key={index+photos.length}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                                            index+photos.length === currentIndex
                                                ? 'bg-blue-600 scale-110'
                                                : 'bg-slate-300 hover:bg-slate-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12 animate-in fade-in-0 zoom-in-50 duration-500">
                        <Camera className="mx-auto h-12 w-12 text-slate-300 animate-pulse" />
                        <p className="mt-2 text-slate-500">No photos available</p>
                    </div>
                )}
            </div>

            <Dialog onClose={closeEdit} open={showEditMenu} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                            <DialogTitle className="text-lg font-semibold text-red-900">
                                {editionMenuLabels.title}
                            </DialogTitle>
                            <Description className="text-red-700 text-sm mt-1">
                                {editionMenuLabels.description}
                            </Description>
                        </div>

                        <div className={`flex flex-row space-x-4`}>
                            <div className={`flex flex-col space-y-4 bg-gray-400`}>
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                    <Camera className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-500" />
                                    Photos
                                </h2>
                                <div className="p-6">
                                    {photosTemp.length+newPhotosTemp.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 group">
                                                <img
                                                    key={currentEditIndex}
                                                    src={!showEditMenu ?
                                                        (photosTemp.length > 0 ? photosTemp[0] : URL.createObjectURL(newPhotosTemp[0]))
                                                        : currentEditIndex < photosTemp.length ?
                                                            photosTemp[currentEditIndex]
                                                            : URL.createObjectURL(newPhotosTemp[currentEditIndex-photosTemp.length])}
                                                    alt={`Room photo ${currentEditIndex + 1}`}
                                                    className="w-full h-full object-cover transition-all duration-500 ease-out animate-in fade-in-0 zoom-in-95"
                                                />

                                                {/* Navigation arrows */}
                                                {photosTemp.length+newPhotosTemp.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={goToPrevious}
                                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                                                        >
                                                            <ChevronLeft size={20} className="transition-transform duration-200 hover:-translate-x-0.5" />
                                                        </button>
                                                        <button
                                                            onClick={goToNext}
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                                                        >
                                                            <ChevronRight size={20} className="transition-transform duration-200 hover:translate-x-0.5" />
                                                        </button>
                                                    </>
                                                )}

                                                {/* Image counter */}
                                                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100">
                                                    {currentEditIndex + 1} / {photosTemp.length+newPhotosTemp.length}
                                                </div>
                                            </div>

                                            {/* Dots indicator */}
                                            {photosTemp.length+newPhotosTemp.length > 1 && (
                                                <div className="flex justify-center gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
                                                    {photosTemp.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentEditIndex(index)}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                                                                index === currentEditIndex
                                                                    ? 'bg-blue-600 scale-110'
                                                                    : 'bg-slate-300 hover:bg-slate-400'
                                                            }`}
                                                        />
                                                    ))}
                                                    {newPhotosTemp.map((_, index) => (
                                                        <button
                                                            key={index+photosTemp.length}
                                                            onClick={() => setCurrentEditIndex(index)}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                                                                index+photosTemp.length === currentEditIndex
                                                                    ? 'bg-blue-600 scale-110'
                                                                    : 'bg-slate-300 hover:bg-slate-400'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 animate-in fade-in-0 zoom-in-50 duration-500">
                                            <Camera className="mx-auto h-12 w-12 text-slate-300 animate-pulse" />
                                            <p className="mt-2 text-slate-500">No photos available</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`flex flex-col`}>
                                {photosTemp.map((photo, index) => (
                                    <div className={`flex flex-row space-x-2`} key={index}>
                                        <button onClick={() => setCurrentEditIndex(index)}>
                                            <img src={photo} alt={`Room photo${index}`} className={`w-120 h-40`}/>
                                        </button>
                                        {setPhotos &&(
                                            <button
                                                name={`removePhoto`}
                                                value={index}
                                                onClick={handleRemovePhoto}
                                                className={`w-7 h-7 bg-red-400 hover:bg-red-500 border border-red-800`}
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {newPhotosTemp.map((photo, index) => (
                                    <div className={`flex flex-row space-x-2`}  key={index} >
                                        <button onClick={() => setCurrentEditIndex(index+photosTemp.length)}>
                                            <img src={URL.createObjectURL(photo)} alt={`Room photo${index}`}/>
                                        </button>
                                        {setNewPhotos && (
                                            <button
                                                name={`removeNewPhoto`}
                                                value={index}
                                                onClick={handleRemovePhoto}
                                                className={`w-7 h-7 bg-red-400 hover:bg-red-500 border border-red-800`}
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>
                                ))
                                }
                                {setNewPhotos && (
                                    <div className={`w-120 h-40`}>
                                        <label>
                                            <input
                                                type={"file"}
                                                name={'newImage'}
                                                className={'hidden'}
                                                onChange={addRoomImage}
                                            />
                                            Add Image
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        {(setPhotos || setNewPhotos) && (
                            <div className={`flex flex-row`}>
                                <button onClick={handleSaveChanges}>
                                    Save Changes
                                </button>
                                <button onClick={handleCancelChanges}>
                                    Cancel
                                </button>
                            </div>

                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}