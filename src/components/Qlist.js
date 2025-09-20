import { useEffect, useState } from "react";
import "../quiz/QuizComponent.css";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { saveAs } from "file-saver";

// Helper: Convert MathJax SVG into PNG (base64)
function svgToPngBase64(svgElement) {
  return new Promise((resolve) => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  });
}

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions from Django
  useEffect(() => {
    fetch("http://127.0.0.1:8000/questions/")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  // Re-run MathJax after questions load
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [questions]);

  // Handle download as Word
  const downloadDocx = async () => {
    const docChildren = [];

    for (let q of questions) {
      // Add question text
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${q.subject} (${q.year})`, bold: true }),
          ],
        })
      );

      // Find MathJax SVGs inside this question card
      //const container = document.getElementById(`question-${q.id}`);
      //const svgs = container ? container.querySelectorAll("svg") : [];

    //   if (svgs.length > 0) {
    //     for (let svg of svgs) {
    //       const imgBase64 = await svgToPngBase64(svg);
    //       docChildren.push(
    //         new Paragraph({
    //           children: [
    //             new ImageRun({
    //               data: imgBase64.split(",")[1], // remove "data:image/png;base64,"
    //               transformation: { width: 200, height: 60 },
    //               type: "base64",
    //             }),
    //           ],
    //         })
    //       );
    //     }
    //   } else 
        // fallback: plain text if no math
    docChildren.push(new Paragraph(q.text.replace(/<\/?[^>]+(>|$)/g, "")));
      

      docChildren.push(new Paragraph("")); // spacer
    }

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 720, right: 720, bottom: 720, left: 720 }, // 0.5 inch
            },
          },
          children: docChildren,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "questions.docx");
  };

  return (
    <div id="home" className="page active">
      <div className="container">
        <div className="content-wrapper">
          <div className="quiz-header">
            <h2>Quiz</h2>
            <div className="progress">Question 1 of {questions.length}</div>
          </div>

          <button onClick={downloadDocx} disabled={loading}>
            Download as Word
          </button>

          <div className="quiz-questions">
            {loading ? (
              <p>Loading questions...</p>
            ) : (
              questions.map((q) => (
                <div
                  key={q.id}
                  id={`question-${q.id}`}
                  className="question-card"
                >
                  <strong>
                    {q.subject} ({q.year})
                  </strong>
                  <br />
                  <span
                    dangerouslySetInnerHTML={{ __html: q.text }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
