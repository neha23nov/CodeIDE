import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';

const Editor = () => {
  const [code, setCode] = useState("");
  const { id } = useParams();
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  // Fetch project data on mount
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code);
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);

  // Save project function
  const saveProject = () => {
    const trimmedCode = code?.toString().trim();

    fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      });
  };

  // Shortcut handler for saving with Ctrl+S
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveProject();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [code]);

  // ✅ Fixed: calls backend /execute instead of glot.io directly (fixes CORS)
  const runProject = async () => {
    try {
      const res = await fetch(`${api_base_url}/execute`, {
        mode: 'cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: data.projLanguage,
          code: code
        })
      });

      const result = await res.json();
      console.log(result);

      const output = result.stdout || result.stderr || "No output";
      setOutput(output);
      setError(!!result.stderr);

    } catch (err) {
      console.error("Run error:", err);
      setOutput("Error running code.");
      setError(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between" style={{ height: 'calc(100vh - 90px)' }}>
        <div className="left w-[50%] h-full">
          <Editor2
            onChange={(newCode) => {
              setCode(newCode || '');
            }}
            theme="vs-dark"
            height="100%"
            width="100%"
            language={data?.projLanguage === "cpp" ? "cpp" : data?.projLanguage || "javascript"}
            value={code}
          />
        </div>
        <div className="right p-[15px] w-[50%] h-full bg-[#27272a]">
          <div className="flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px]">
            <p className="p-0 m-0">Output</p>
            <button
              className="btnNormal !w-fit !px-[20px] bg-blue-500 transition-all hover:bg-blue-600"
              onClick={runProject}
            >
              run
            </button>
          </div>
          <pre className={`w-full h-[75vh] ${error ? "text-red-500" : ""}`} style={{ textWrap: "nowrap" }}>{output}</pre>
        </div>
      </div>
    </>
  );
};

export default Editor;