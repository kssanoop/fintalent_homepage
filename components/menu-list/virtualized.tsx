import React from "react";
import PropTypes from "prop-types";
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

function VirtualizedList({
  children,
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  listStyle,
  itemSize,
  height,
  width,
  listRef,
}: any) {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => undefined : loadNextPage;
  const isItemLoaded = (index: any) => !hasNextPage || index < items.length;

  return (
    <InfiniteLoader
      data-testId="infinite-loader"
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => {
        return (
          <List
            ref={(currentRef) => {
              if (listRef) {
                listRef(currentRef);
              }
              ref(currentRef);
            }}
            width={width}
            height={height}
            itemCount={itemCount}
            itemSize={itemSize}
            style={listStyle}
            onItemsRendered={onItemsRendered}
            className="VirtualizedList-Component"
          >
            {(listProps) => children(listProps)}
          </List>
        );
      }}
    </InfiniteLoader>
  );
}

VirtualizedList.propTypes = {
  hasNextPage: PropTypes.bool,
  isNextPageLoading: PropTypes.bool,
  items: PropTypes.array,
  loadMoreItems: PropTypes.func,
  listStyle: PropTypes.object,
  itemSize: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  listRef: PropTypes.func,
};

export default VirtualizedList;
