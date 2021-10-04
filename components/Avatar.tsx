/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { supabase } from 'utils/supabaseClient';

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error:any) {
      console.log('Error downloading image: ', error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error:any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
      <p className="text-sm font-medium text-gray-700" aria-hidden="true">
        Photo
      </p>
      <div className="mt-1 lg:hidden">
        <div className="flex items-center">
          <div
            className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
            aria-hidden="true"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="rounded-full h-full w-full"
              />
            ) : (
              <div
                className="avatar no-image"
                style={{ height: size, width: size }}
              />
            )}
          </div>
          <div className="ml-5 rounded-md shadow-sm">
            <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
              <label
                htmlFor="mobile-user-photo"
                className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
              >
                <span>Change</span>
                <span className="sr-only"> user photo</span>
              </label>
              <input
                id="mobile-user-photo"
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden relative rounded-full overflow-hidden w-40 h-40 lg:block">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="relative rounded-full w-40 h-40"
          />
        ) : (
          <div
            className="avatar no-image"
            style={{ height: size, width: size }}
          />
        )}
        <label
          htmlFor="desktop-user-photo"
          className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
        >
          <span>Change</span>
          <span className="sr-only"> user photo</span>
          <input
            type="file"
            id="desktop-user-photo"
            name="user-photo"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}
