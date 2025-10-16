import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// PeerReviewGuide: your interactive guide component with state management
const PeerReviewGuide = () => {
  const sections = [
    {
      id: "prSection1",
      title: "ROPS",
      header: "How to create Marketo program for EMC using Power Apps Form",
      questions: [
        {
          id: "q1",
          text: "Did the SDS trigger the ROPs manually to automate the request?",
          options: ["Applicable", "Not Applicable"],
        },
        {
          id: "q2",
          text: "ROPS auto and manual triggered failed",
          options: ["Applicable", "Not Applicable"],
        },
      ],
    },
    {
      id: "prSection2",
      title: "Name-o-Matic",
      header: "How to create Marketo program for EMC using Power Apps Form",
      questions: [
        {
          id: "q3",
          text: "Did the SDS trigger the ROPs manually to automate the request?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
        {
          id: "q4",
          text: "Did the SDS follow the right filed in creating the Name-o-matic?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
      ],
    },
    {
      id: "prSection3",
      title: "Marketo",
      header: "Marketo Tag",
      questions: [
        {
          id: "q5",
          text: "Are the right setup tags populated base on the request?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
        {
          id: "q6",
          text: "Are the right setup tags populated base on the request?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
        {
          id: "q7",
          text: "Did the SDS update the Smart List correctly?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
        {
          id: "q8",
          text: "Did the SDS update the Flow tab correctly?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
        {
          id: "q9",
          text: "Did the SDS activate the necessary campaigns?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
        {
          id: "q10",
          text: "Did the SDS update the Smart List correctly?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
        {
          id: "q11",
          text: "Did the SDS update the Flow tab correctly?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
        {
          id: "q12",
          text: "Did the SDS activate the necessary campaigns?",
          options: ["Applicable", "Not Applicable"],
          fatalityOptions: ["Non-Fatal", "Fatal"],
        },
      ],
    },
    {
      id: "prSection4",
      title: "ON24",
      header: "Selected Capability",
      questions: [
        {
          id: "q13",
          text: "Technical Content",
          options: [],
        },
      ],
    },
    {
      id: "prSection5",
      title: "EMC",
      header: "Selected Capability",
      questions: [
        {
          id: "q14",
          text: "Technical Content",
          options: [],
        },
      ],
    },
    {
      id: "prSection6",
      title: "MaSH Form",
      header: "Selected Capability",
      questions: [
        {
          id: "q15",
          text: "Technical Content",
          options: [],
        },
      ],
    },
  ];

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Peer Review Guide
      </h1>
      {sections.map((section) => (
        <div
          key={section.id}
          style={{
            maxWidth: 900,
            margin: "16px auto",
            borderRadius: 8,
            boxShadow:
              "0 4px 12px rgba(58, 175, 159, 0.12), 0 6px 24px rgba(0, 0, 0, 0.06)",
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(section.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSection(section.id);
              }
            }}
            aria-expanded={!!openSections[section.id]}
            style={{
              backgroundColor: "#1565c0",
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              padding: "24px 36px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              userSelect: "none",
              borderBottom: "1px solid #e5e7eb",
              outline: "none",
            }}
          >
            <span>{section.title}</span>
            <span
              style={{
                fontSize: 24,
                transform: openSections[section.id]
                  ? "rotate(0deg)"
                  : "rotate(-90deg)",
                transition: "transform 0.3s",
              }}
              aria-hidden="true"
            >
              ▼
            </span>
          </div>
          {openSections[section.id] && (
            <div style={{ padding: "16px 28px 24px 28px" }}>
              <div
                style={{
                  backgroundColor: "#1956ad",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 4,
                  marginBottom: 14,
                  padding: "10px 18px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {section.header}
              </div>
              {section.questions.map((q) => (
                <div
                  key={q.id}
                  style={{
                    marginBottom: 24,
                    fontWeight: 600,
                    color: "#1f2937",
                    fontSize: 15,
                    lineHeight: 1.4,
                  }}
                >
                  <div>{q.text}</div>
                  {q.fatalityOptions && (
                    <div style={{ margin: "6px 0 12px 0" }}>
                      {q.fatalityOptions.map((opt) => (
                        <label
                          key={opt}
                          style={{
                            marginRight: 24,
                            fontWeight: "normal",
                            color: opt === "Fatal" ? "red" : "orange",
                            userSelect: "none",
                          }}
                        >
                          <input
                            type="radio"
                            name={`fatality-${q.id}`}
                            style={{ marginRight: 6 }}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                  <div>
                    {q.options.map((opt) => (
                      <label
                        key={opt}
                        style={{
                          marginRight: 24,
                          fontWeight: "normal",
                          userSelect: "none",
                        }}
                      >
                        <input
                          type="radio"
                          name={`answer-${q.id}`}
                          style={{ marginRight: 6 }}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// NewWindow component for managing popup window & React portal
const NewWindow = ({ children, onClose }) => {
  const containerEl = React.useRef(document.createElement("div")).current;
  const newWindowRef = React.useRef(null);

  React.useEffect(() => {
    // Open new popup window
    newWindowRef.current = window.open(
      "",
      "",
      "width=980,height=900,left=200,top=90"
    );

    // Append container div inside body of new window
    newWindowRef.current.document.body.appendChild(containerEl);

    // Copy styles for consistent look
    Array.from(document.styleSheets).forEach((styleSheet) => {
      try {
        if (styleSheet.cssRules) {
          const newStyleEl =
            newWindowRef.current.document.createElement("style");
          Array.from(styleSheet.cssRules).forEach((rule) => {
            newStyleEl.appendChild(document.createTextNode(rule.cssText));
          });
          newWindowRef.current.document.head.appendChild(newStyleEl);
        } else if (styleSheet.href) {
          const newLinkEl = newWindowRef.current.document.createElement("link");
          newLinkEl.rel = "stylesheet";
          newLinkEl.href = styleSheet.href;
          newWindowRef.current.document.head.appendChild(newLinkEl);
        }
      } catch (e) {
        // Ignore cross-origin stylesheets
      }
    });

    // Close handler
    const handleBeforeUnload = () => {
      onClose();
    };
    newWindowRef.current.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      newWindowRef.current.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
      if (!newWindowRef.current.closed) newWindowRef.current.close();
    };
  }, [containerEl, onClose]);

  return ReactDOM.createPortal(children, containerEl);
};

// Button component to open popup with peer review guide
const PeerReviewGuidePopupButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-transform focus:outline-none"
        style={{ margin: "20px auto", display: "block" }}
      >
        Open Peer Review Guide
      </button>
      {isOpen && (
        <NewWindow onClose={() => setIsOpen(false)}>
          <PeerReviewGuide />
        </NewWindow>
      )}
    </>
  );
};

export default PeerReviewGuidePopupButton;
