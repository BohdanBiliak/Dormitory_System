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
        <div className="w-full">
            {photos.length + newPhotos.length > 0 ? (
                <div className="space-y-3">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 group shadow-sm border border-gray-200">
                        <img
                            key={currentIndex}
                            src={showEditMenu?
                                (photos.length > 0 ? photos[0]: URL.createObjectURL(newPhotos[0]))
                                : currentIndex < photos.length ?
                                    photos[currentIndex]
                                    : URL.createObjectURL(newPhotos[currentIndex-photos.length])}
                            alt={`Photo ${currentIndex + 1}`}
                            className="w-full h-full object-cover transition-all duration-500 ease-out"
                        />

                        {/* Navigation arrows */}
                        {photos.length + newPhotos.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                                >
                                    <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                                >
                                    <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                                </button>
                            </>
                        )}

                        {/* Image counter */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                            {currentIndex + 1} / {photos.length + newPhotos.length}
                        </div>
                    </div>

                    {/* Dots indicator */}
                    {photos.length + newPhotos.length > 1 && (
                        <div className="flex justify-center gap-1.5">
                            {photos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentIndex
                                            ? 'bg-blue-600 scale-110'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                            {newPhotos.map((_, index) => (
                                <button
                                    key={index + photos.length}
                                    onClick={() => setCurrentIndex(index + photos.length)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index + photos.length === currentIndex
                                            ? 'bg-blue-600 scale-110'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="aspect-video rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6">
                    <Camera className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3" />
                    <p className="text-sm sm:text-base text-gray-500 font-medium">No photos available</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">Add photos to see them here</p>
                </div>
            )}

            <Dialog onClose={closeEdit} open={showEditMenu} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
                <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
                    <DialogPanel className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-4 flex items-center justify-between">
                            <div>
                                <DialogTitle className="text-lg font-semibold text-white">
                                    {editionMenuLabels.title}
                                </DialogTitle>
                                <Description className="text-blue-100 text-sm mt-1">
                                    {editionMenuLabels.description}
                                </Description>
                            </div>
                            <button 
                                onClick={closeEdit}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 h-full">
                                
                                {/* Main Preview */}
                                <div className="lg:col-span-2 space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <Camera className="w-5 h-5 mr-2 text-blue-600" />
                                        Preview
                                    </h3>
                                    
                                    {photosTemp.length + newPhotosTemp.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 group shadow-sm">
                                                <img
                                                    key={currentEditIndex}
                                                    src={currentEditIndex < photosTemp.length ?
                                                        photosTemp[currentEditIndex]
                                                        : URL.createObjectURL(newPhotosTemp[currentEditIndex - photosTemp.length])}
                                                    alt={`Photo ${currentEditIndex + 1}`}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* Navigation arrows */}
                                                {photosTemp.length + newPhotosTemp.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={goToPrevious}
                                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                                        >
                                                            <ChevronLeft size={20} />
                                                        </button>
                                                        <button
                                                            onClick={goToNext}
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                                        >
                                                            <ChevronRight size={20} />
                                                        </button>
                                                    </>
                                                )}

                                                {/* Image counter */}
                                                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                                                    {currentEditIndex + 1} / {photosTemp.length + newPhotosTemp.length}
                                                </div>
                                            </div>

                                            {/* Dots indicator */}
                                            {photosTemp.length + newPhotosTemp.length > 1 && (
                                                <div className="flex justify-center gap-2">
                                                    {photosTemp.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentEditIndex(index)}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                                index === currentEditIndex
                                                                    ? 'bg-blue-600 scale-110'
                                                                    : 'bg-gray-300 hover:bg-gray-400'
                                                            }`}
                                                        />
                                                    ))}
                                                    {newPhotosTemp.map((_, index) => (
                                                        <button
                                                            key={index + photosTemp.length}
                                                            onClick={() => setCurrentEditIndex(index + photosTemp.length)}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                                index + photosTemp.length === currentEditIndex
                                                                    ? 'bg-blue-600 scale-110'
                                                                    : 'bg-gray-300 hover:bg-gray-400'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="aspect-video rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
                                            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                            <p className="text-gray-500 font-medium">No photos available</p>
                                            <p className="text-gray-400 text-sm mt-1">Add photos to see them here</p>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail Gallery */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Gallery</h3>
                                        {setNewPhotos && (
                                            <label className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Add
                                                <input
                                                    type="file"
                                                    name="newImage"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={addRoomImage}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {/* Existing photos */}
                                        {photosTemp.map((photo, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                                                <button 
                                                    onClick={() => setCurrentEditIndex(index)}
                                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                                        currentEditIndex === index ? 'border-blue-500' : 'border-gray-200'
                                                    }`}
                                                >
                                                    <img 
                                                        src={photo} 
                                                        alt={`Photo ${index + 1}`} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        Photo {index + 1}
                                                    </p>
                                                    <p className="text-xs text-gray-500">Existing photo</p>
                                                </div>
                                                {setPhotos && (
                                                    <button
                                                        name="removePhoto"
                                                        value={index}
                                                        onClick={handleRemovePhoto}
                                                        className="flex-shrink-0 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        
                                        {/* New photos */}
                                        {newPhotosTemp.map((photo, index) => (
                                            <div key={index + photosTemp.length} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                                                <button 
                                                    onClick={() => setCurrentEditIndex(index + photosTemp.length)}
                                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                                        currentEditIndex === index + photosTemp.length ? 'border-green-500' : 'border-green-200'
                                                    }`}
                                                >
                                                    <img 
                                                        src={URL.createObjectURL(photo)} 
                                                        alt={`New photo ${index + 1}`} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {photo.name}
                                                    </p>
                                                    <p className="text-xs text-green-600">New photo</p>
                                                </div>
                                                {setNewPhotos && (
                                                    <button
                                                        name="removeNewPhoto"
                                                        value={index}
                                                        onClick={handleRemovePhoto}
                                                        className="flex-shrink-0 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        
                                        {photosTemp.length + newPhotosTemp.length === 0 && (
                                            <div className="text-center py-8">
                                                <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">No photos to display</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        {(setPhotos || setNewPhotos) && (
                            <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-end space-x-3">
                                <button 
                                    onClick={handleCancelChanges}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSaveChanges}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}