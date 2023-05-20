'use client';
import { FormEvent, ChangeEvent, useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const isFirstRender = useRef(true);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(Array.from(fileList));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (processing) {
      toast('File upload in progress, please wait...', { type: 'warning' })
      return
    }

    if (Array.isArray(files) && files.length > 0) {
      const data = new FormData()

      files.forEach((file) => {
        data.append('md_files', file)
      });

      try {
        console.log('Uploading file...')
        const result = await fetch('http://localhost:5001/qa/upload-files/form', {
          method: 'POST',
          body: data,
        });
        if (result.status === 202) {
          setUploadedFiles([
            ...uploadedFiles,
            ...files.map((file) => ({
              name: file.name,
              size: file.size,
              type: file.type,
            })),
          ]);
          setFiles([]);
          toast('Files received, processing...', { type: 'success' })
          setProcessing(true);
        }
      } catch(err) {
          console.error(err);
          return
      }
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (processing) {
      let processingDone = false;
      console.log('Starting SSE...')
      const source = new EventSource("http://localhost:5001/qa/upload-files/stream");

      console.log('useEffect called, processing:', processing);

      source.onmessage = (event) => {
        console.log(event)
        toast(event.data, { type: 'info' })
        if (event.data === 'Finished processing all files.') {
          setProcessing(false);
          processingDone = true;
        }
      };
      source.onerror = (event) => {
        if (processingDone) {
          console.log('Stream closed after processing');
          return;
        }
        console.error(event);
        toast('Error occurred while processing files', { type: 'error' })
        setProcessing(false);
      };

      return () => {
        console.log('Closing SSE...')
        source.close();
      }
    }
  }, [processing]);

  return (
    <main>
      <ToastContainer />
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
              )) : <p>No files uploaded yet.</p>
            }
        </div>
      </div>
    </main>
  );
};

export default Upload;
