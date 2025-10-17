import React from "react";

// Button component opening external URL in new popup window
const PeerReviewGuidePopupButton = () => {
  const handleOpen = () => {
    const url = "https://vincezamora-7.github.io/PRFormEvents/"; // Replace with your actual URL
    const width = 980;
    const height = 900;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    window.open(
      url,
      "PeerReviewGuide",
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`
    );
  };

  return (
    <button
      onClick={handleOpen}
      className="inline-flex items-center px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-transform focus:outline-none"
      style={{ margin: "20px auto", display: "block" }}
    >
      Open Peer Review Guide
    </button>
  );
};

export default PeerReviewGuidePopupButton;
