import React, { useEffect, useState } from "react";

const AdSense = ({ pId, slot, placeholderImage }) => {
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`;
    script.crossOrigin = "anonymous";
    
    script.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
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
    <div style={{ textAlign: "center", margin: "auto" }}>
      {adFailed ? (
        <img
          src={placeholderImage}
          alt="Placeholder"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "auto" }}
          data-ad-client={`ca-pub-${pId}`}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};

export default AdSense;
