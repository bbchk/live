import ListingProductCard from './card/listing_card'

import s from './gallery.module.scss'

import {
  AutoSizer,
  InfiniteLoader,
  WindowScroller,
  Grid,
  ArrowKeyStepper,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized'

import { useWishList } from '#root/hooks/useWishList.js'
import { useState } from 'react'
import TabIndexButton from 'comps/accessibility/indexTabButton.js'
import useScrollTo from '#root/hooks/use_scroll_to.js'

const MIN_COLUMNS = 2 // Minimum number of columns
const MIN_COLUMN_WIDTH = 250 // Minimum width for a column

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  const [wshl, like] = useWishList()

  const [columnsNumber, setColumnsNumber] = useState(4)

  const cellRenderer = ({ columnIndex, rowIndex, key, style, columnCount }) => {
    const index = rowIndex * columnCount + columnIndex

    const product = products[index]

    if (!product) return null

    product.isLiked = wshl.includes(product._id)
    product.like = like

    const isLast = columnIndex === columnCount - 1

    function handleBlur(e) {
      e.preventDefault()
      if (window) {
        if (e.key === 'Tab' && e.keyCode === 9) {
          if (e.shiftKey) {
            window.scrollBy(0, -400)
          } else {
            window.scrollBy(0, 400)
          }
          const el = document.getElementById(`product-card-${index + 1}`)
          el.focus()
        }
      }
    }

    return (
      <div
        role='row'
        key={key}
        onKeyDown={isLast ? (e) => handleBlur(e) : undefined}
      >
        <TabIndexButton
          aria-label={`Перейти до ${product.name}`}
          aria-description={`Натисніть Enter, що перейти до ${product.name}`}
          role='gridcell'
          style={style}
          id={`product-card-${index}`}
        >
          <ListingProductCard
            product={product}
            priority={index < columnCount}
          />
        </TabIndexButton>
      </div>
    )
  }

  return (
    <div
      className={`${s.g}`}
      style={{
        '--children-number': Math.ceil(products.length / columnsNumber),
      }}
    >
      <InfiniteLoader
        isRowLoaded={({ index }) => !!products[index]}
        loadMoreRows={({ startIndex, stopIndex }) => {
          // Load more products when the user scrolls
        }}
        rowCount={products.length / columnsNumber}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => {
                  let columnCount = Math.floor(width / MIN_COLUMN_WIDTH)
                  columnCount =
                    columnCount < MIN_COLUMNS ? MIN_COLUMNS : columnCount

                  setColumnsNumber(columnCount)
                  const rowCount = Math.ceil(products.length / columnsNumber)

                  return (
                    // <ArrowKeyStepper
                    //   columnCount={columnCount}
                    //   rowCount={rowCount}
                    //   // mode='cells'
                    // >
                    //   {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
                    <Grid
                      autoHeight
                      cellRenderer={({ columnIndex, rowIndex, key, style }) =>
                        cellRenderer({
                          columnIndex,
                          rowIndex,
                          key,
                          style,
                          columnCount,
                        })
                      }
                      columnCount={columnCount}
                      columnWidth={width / columnCount}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      overscanColumnCount={0}
                      overscanRowCount={0}
                      rowCount={rowCount}
                      rowHeight={400}
                      scrollTop={scrollTop}
                      width={width}
                      // scrollToColumn={scrollToColumn}
                      // scrollToRow={scrollToRow}
                      // onSectionRendered={onSectionRendered}
                    />
                    //       )}
                    //     </ArrowKeyStepper>
                  )
                }}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  )
}

export default ProductGallery
