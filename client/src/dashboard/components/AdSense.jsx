import React, { useEffect, useState } from "react";

const AdSense = ({ pId }) => {
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log("Ad script loaded successfully.");
      } catch (error) {
        console.log("Ad script error:", error.message);
        setAdFailed(true);
      }
    };

    script.onerror = () => {
      console.log("Ad script failed to load.");
      setAdFailed(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [pId]);

  return (
    <>
      {adFailed ? (
        <img
          src="https://via.placeholder.com/1200x600"
          alt="Placeholder"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={`ca-pub-${pId}`}
          data-ad-slot="3153382277" // Replace with your actual ad slot
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      )}
    </>
  );
};

export default AdSense;
