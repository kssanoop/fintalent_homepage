import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import Image, { ImageProps, StaticImageData } from "next/image"

type SlideDirection = "left" | "right" | "up" | "down";

type Props = {
  children?: React.ReactNode;
  // src: StaticImageData;
  // alt?: string;
  direction: SlideDirection;
  // width?: number;
  // height?:number;
  className?: string;
  style?: React.CSSProperties;
};

const SlideAnimationWrapper = ({
  direction,
  className,
  children,
  style,
}: Props) => {
  const [ref, inView] = useInView({
    rootMargin: "-100px 0px",
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: "-100", y: 0 };
      case "right":
        return { x: "100", y: 0 };
      case "up":
        return { x: 0, y: "-100" };
      case "down":
        return { x: 0, y: "100" };
      default:
        return { x: 0, y: 0 };
    }
  };

  const variants = {
    hidden: { opacity: 0, ...getInitialPosition() },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 1 }}
      style={{ marginBottom: "0px", ...style }}
      className={className}
    >
      <div />
      <motion.div className="card">{children}</motion.div>
    </motion.div>
  );
};

export default SlideAnimationWrapper;
