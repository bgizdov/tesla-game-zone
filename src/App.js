import './App.css';
import gamesData from './gamesData.json';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

console.log('gamesData', gamesData);
const items = gamesData.games;

function CardImage({ item }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="card-image" style={{width: '100%', height: '175px', position: 'relative'}}>
            {isLoading && (
                <div className="image-placeholder" style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}>
                    <span>Loading...</span>
                </div>
            )}
            <a href={`/Games/${item.gameUrl}`} target='_blank'>
                <img
                    src={`/images/${item.thumbnailUrl}`}
                    alt={item.gameTitle}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: isLoading ? 'none' : 'block',
                        position: 'absolute',
                        bottom: 0
                    }}
                    onLoad={() => setIsLoading(false)}
                />
            </a>
        </div>
    );
}

function Items({currentItems}) {
    return (
        <>
            <div className="columns">
                {currentItems &&
                    currentItems.map((item) => (
                        <div className="column col-3 col-md-6 col-sm-12" key={item.gameUrl}>
                            <div className="card m-1 p-centered">
                                <div className="card-header">
                                    <a href={`/Games/${item.gameUrl}`} target='_blank'>
                                        <div className="card-title h5">{item.gameTitle}</div>
                                    </a>
                                </div>
                                <CardImage item={item} />
                                <div className="card-footer">
                                    <a href={`/Games/${item.gameUrl}`} target='_blank'>
                                        <button className="btn btn-primary">Play</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div class="divider" data-content="Pagination"></div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        className='pagination'
        nextClassName='page-item float-left btn btn-primary'
        nextLinkClassName='text-secondary'
        previousClassName='page-item float-left btn btn-primary d-block'
        previousLinkClassName='text-secondary'
        pageClassName='page-item float-left btn btn-primary'
        pageLinkClassName='text-secondary'
        breakClassName='page-item float-left'
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
ReactDOM.render(
  <PaginatedItems itemsPerPage={8} />,
  document.getElementById('container')
);

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
