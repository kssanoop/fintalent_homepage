const useScrollToTop = ({ elementId }: { elementId: string }) => {
  const scrollToTop = () => {
    const myDiv = document.getElementById(elementId);
    if (myDiv) {
      myDiv.style.scrollBehavior = "smooth";
      myDiv.scrollTop = 0;
    }
  };
  return { scrollToTop };
};

export default useScrollToTop;
