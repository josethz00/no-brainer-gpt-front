'use client';
import { FormEvent, ChangeEvent, useState } from 'react';
import Header from '../components/Header';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFile(fileList[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (file) {
        const data = new FormData()
        data.append('md_files', file)

        try {
            console.log('Uploading file...')
            const result = await fetch('http://localhost:5001/qa/upload-files/form', {
                method: 'POST',
                body: data,
            });
            if (result.status === 202) {
                setUploadedFiles([
                    ...uploadedFiles,
                    { name: file.name, size: file.size, type: file.type },
                ]);
                setFile(null);
            }
        } catch(err) {
            console.error(err);
            return
        }
    }
  };

  return (
    <main>
        <Header />
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="max-w-xl w-full m-4 p-6 bg-white/20 shadow-md rounded-md">
                <div className="flex items-center h-12 bg-white/40 rounded-lg mb-4">
                <input type="file" accept=".md, .txt" onChange={handleFileChange} className="flex-grow px-4 py-2 text-gray-700 bg-transparent outline-none" />
                </div>
                <button type="submit" className="w-full text-white px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">
                    Upload
                </button>
            </form>
            <div className="max-w-xl w-full m-4 p-6 bg-white/20 shadow-md rounded-md overflow-y-auto max-h-64">
                <h2 className="text-xl mb-4">Uploaded Files:</h2>
                {uploadedFiles.length ? uploadedFiles.map((file, index) => (
                <div key={index} className="border-b border-gray-200 py-2">
                    <p><strong>Name:</strong> {file.name}</p>
                    <p><strong>Size:</strong> {file.size} bytes</p>
                    <p><strong>Type:</strong> {file.type}</p>
                </div>
                )) : <p>No files uploaded yet.</p>}
            </div>
        </div>
    </main>
  );
};

export default Upload;
