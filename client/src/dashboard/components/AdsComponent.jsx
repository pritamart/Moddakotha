import React, { useEffect } from 'react';

const AdsComponent = ({ dataAdSlot }) => {

  useEffect(() => {
    // Check if the Google AdSense script is already loaded
    if (window.adsbygoogle && window.adsbygoogle.length > 0) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsense error", e);
      }
    } else {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute('data-ad-client', 'ca-pub-1874335055795370'); // Your AdSense client ID
      document.head.appendChild(script);
      script.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("Adsense error", e);
        }
      };
    }
  }, []);

  return (
    <ins 
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1874335055795370" // Your AdSense client ID
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  );
};

export default AdsComponent;
