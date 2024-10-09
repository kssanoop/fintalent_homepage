// @ts-nocheck
// TODO:remove ts-nocheck
import React from "react";

type Dimensions = {
  width: number | null;
  height: number | null;
};
export default function useMeasure() {
  const [dimensions, setDimensions] = React.useState<Dimensions>({
    width: null,
    height: null,
  });

  const previousObserver = React.useRef(null);

  const customRef = React.useCallback((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry?.borderBoxSize) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];

          setDimensions({ width, height });
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return { ref: customRef, dimensions };
}
