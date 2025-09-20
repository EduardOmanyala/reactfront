import { useEffect, useState } from "react";

import { Document, Packer, Paragraph, TextRun} from "docx";
import { saveAs } from "file-saver";

// Helper: Convert MathJax SVG into PNG (base64)
// function svgToPngBase64(svgElement) {
//   return new Promise((resolve) => {
//     const svgData = new XMLSerializer().serializeToString(svgElement);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     const img = new Image();
//     img.onload = function () {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//       resolve(canvas.toDataURL("image/png"));
//     };
//     img.src = "data:image/svg+xml;base64," + btoa(svgData);
//   });
// }

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
   

         <div className="q-header">
            <div id="1">
              

              <h3 className="gform">Past Papers by Year</h3>
              <form className="login-form" id="loginForm" novalidate>
                <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" required>
                    <option value="" disabled selected>Select a subject</option>
                    <option value="Physics">Physics</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Geography">Geography</option>
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="year">Year</label>
                <select id="year" name="year">
                    <option value="" disabled selected>Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="type">Paper Type</label>
                <select id="type" name="type">
                    <option value="paper1">Paper 1</option>
                    <option value="paper2">Paper 2</option>
                </select>
                </div>


                <button type="submit" class="login-btn">
                    <span class="btn-text">Get Paper</span>
                    <div class="btn-loader">
                        <div class="spinner"></div>
                    </div>
                </button>
            </form>

            </div>
            <div id="2">


        <div class="actions">
        <button onClick={downloadDocx} disabled={loading}  class="btn" title="Download">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download (docx)
        </button>
        <button class="btn" title="Save">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          Save
        </button>
        <button class="btn" title="Share">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
          Share
        </button>
        <button class="btn" title="Print">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print
        </button>
        <button class="btn" title="Embed">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Embed
        </button>
        <button class="btn" title="Report">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18l-1 7-8 2-8-2-1-7z"/><path d="M13 14.5V22"/><path d="M11 22h4"/></svg>
          Report
        </button>
        </div>


            <div className="q-main">

           
                <h2 style={{ 
                  textAlign: "center", 
                  margin: "0 !important",
                  padding: "0 !important",
                  lineHeight: "1",
                  display: "block"
              }}>
                  THE KENYA NATIONAL EXAMINATIONS COUNCIL
              </h2>
                <h4 style={{
                  textAlign: "center", 
                  margin: "0 !important",
                  padding: "0 !important",
                  lineHeight: "1",
                  display: "block"
              }}>
                  <strong>Kenya Certificate of Secondary Education</strong>
              </h4>
                <p style={{
                  textAlign: "center", 
                  margin: "0 !important",
                  padding: "0 !important",
                  lineHeight: "1",
                  display: "block",
                  marginTop: "4px !important"
              }}>
                  101/2 — Paper 2 — ENGLISH
              </p>
                <hr/>
              
                {loading ? (
                <p>Loading questions...</p>
                ) : (
                questions.map((q, index) => (
                    <div
                    key={q.id}
                    id={`question-${q.id}`}
                    className="question-card552555"
                    >
                    <strong>
                        Question  {index + 1}
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
            <div></div>
          </div>



 
  );
}
