import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../Config";

const Download = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const downloadFile = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await fetch(
          `${BASE_URL}/books/download/${id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Download failed");
        }

        const blob = await response.blob();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Optional filename
        a.download = `book_${id}`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Cleanup
        window.URL.revokeObjectURL(url);

        // Redirect after download (optional)
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        navigate("/"); // fallback
      }
    };

    downloadFile();
  }, [id, navigate]);

  return <div>Preparing your download...</div>;
};

export default Download;