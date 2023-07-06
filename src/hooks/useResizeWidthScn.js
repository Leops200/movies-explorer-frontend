import { useEffect, useCallback, useState } from "react";

function useResizeWidthScn() {
  // 
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  // 
  useEffect(() => {
    let timer;

    function screenResize() {
      setScreenWidth(getScreenWidth());
    }
    // задержка смены в миллисекундах
    function handleSetTimeout() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          screenResize();
        }, 1000);
      }
    }

    window.addEventListener("resize", handleSetTimeout);
    return () => window.removeEventListener("resize", handleSetTimeout);
  }, [getScreenWidth]);

  return screenWidth;
}

export default useResizeWidthScn;