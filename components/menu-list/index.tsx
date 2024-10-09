import React from "react";
import VirtualizedList from "./virtualized";

export function MenuList(props: any) {
  const listRef = React.useRef(null);
  // const [cachedIndex, setCachedIndex] = React.useState(null);
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const heightCalc = children.length * props.selectProps.itemSize();
  const customHeight = heightCalc >= 300 ? 300 : heightCalc;

  const currentIndex = Math.max(
    children.findIndex((child: any) => child.props.isFocused),
    0,
  );
  console.log(currentIndex);
  // THIS IS BUGGED
  React.useEffect(() => {
    if (listRef.current) {
      // @ts-ignore
      listRef.current.scrollToItem(currentIndex);
    }
  }, [currentIndex]);

  return (
    // @ts-ignore
    <VirtualizedList
      listRef={(ref) => {
        listRef.current = ref;
      }}
      width={100}
      height={customHeight}
      listStyle={{ width: "100%" }}
      items={children}
      hasNextPage={props.selectProps.hasNextPage}
      isNextPageLoading={props.selectProps.isNextPageLoading}
      loadNextPage={props.selectProps.loadNextPage}
      itemSize={props.selectProps.itemSize}
    >
      {({ index, style }: any) => {
        return children[index] ? (
          <div style={style}>{children[index]}</div>
        ) : (
          <div style={style}>
            <span>Loading...</span>
          </div>
        );
      }}
    </VirtualizedList>
  );
}
