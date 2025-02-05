import { useEffect } from 'react';

function AdDisplay() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading AdSense:', error);
    }
  }, []);

  return (
    <div className="w-full my-4">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-3701045347092080"
           data-ad-slot="1931875837"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </div>
  );
}

export default AdDisplay;