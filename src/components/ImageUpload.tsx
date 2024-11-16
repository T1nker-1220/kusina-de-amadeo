'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { TbPhotoPlus, TbX } from 'react-icons/tb';
import { BiLoading } from 'react-icons/bi';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback((result: any) => {
    setIsUploading(false);
    setError(null);
    onChange(result.info.secure_url);
  }, [onChange]);

  const handleError = useCallback((error: any) => {
    setIsUploading(false);
    setError('Failed to upload image. Please try again.');
    console.error('Upload error:', error);
  }, []);

  const handleStartUpload = useCallback(() => {
    setIsUploading(true);
    setError(null);
  }, []);

  return (
    <div className="space-y-2">
      <CldUploadWidget 
        onUpload={handleUpload}
        onError={handleError}
        onStart={handleStartUpload}
        uploadPreset="payment_proof"
        options={{
          maxFiles: 1,
          resourceType: "image",
          folder: "payment_proofs",
          clientAllowedFormats: ["png", "jpeg", "jpg"],
          maxFileSize: 5000000, // 5MB
          sources: ["local", "camera"],
          showAdvancedOptions: false,
          multiple: false,
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#0078FF",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#0078FF",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#E4EBF1"
            },
            fonts: {
              default: null,
              "'Poppins', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Poppins",
                active: true
              }
            }
          }
        }}
      >
        {({ open }) => {
          return (
            <div className="relative">
              <div
                onClick={() => !isUploading && open?.()}
                className={`
                  relative
                  cursor-pointer
                  transition-all
                  duration-300
                  border-2
                  ${error ? 'border-red-400 bg-red-50' : 'border-neutral-300 bg-gray-50'}
                  ${isUploading ? 'border-blue-400 bg-blue-50' : ''}
                  ${value ? 'border-solid' : 'border-dashed'}
                  p-4
                  sm:p-6
                  md:p-8
                  lg:p-10
                  rounded-lg
                  flex
                  flex-col
                  justify-center
                  items-center
                  gap-2
                  md:gap-4
                  text-neutral-600
                  min-h-[200px]
                  sm:min-h-[250px]
                  md:min-h-[300px]
                  ${!isUploading && 'hover:border-blue-500 hover:bg-blue-50'}
                  group
                `}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <BiLoading className="w-10 h-10 animate-spin text-blue-500" />
                    <p className="text-blue-500 font-medium">Uploading...</p>
                  </div>
                ) : value ? (
                  <>
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        fill 
                        style={{ objectFit: 'contain' }} 
                        src={value} 
                        alt="Payment proof"
                        className="rounded-lg p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        Click to change
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <TbPhotoPlus
                        size={50}
                        className={`
                          ${error ? 'text-red-500' : 'text-neutral-500'}
                          group-hover:text-blue-500
                          transition-colors
                          duration-300
                        `}
                      />
                      {error && (
                        <div className="absolute -top-1 -right-1">
                          <TbX className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    <div className="font-semibold text-base md:text-lg text-center">
                      {error ? 'Try Again' : 'Click to upload GCash screenshot'}
                    </div>
                    <div className="text-sm text-center px-4 space-y-1">
                      <p className={error ? 'text-red-500' : 'text-neutral-500'}>
                        {error || 'Supported: PNG, JPEG (Max 5MB)'}
                      </p>
                      {!error && (
                        <p className="text-neutral-400">
                          Your image will be saved securely
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
      
      {/* Mobile Instructions */}
      <div className="block sm:hidden text-xs text-neutral-500 text-center mt-2">
        Tip: Take a clear screenshot of your entire GCash payment confirmation
      </div>
    </div>
  );
}

export default ImageUpload;
