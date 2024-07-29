import logo from './logo.svg';
import './App.css';
import gamesData from './gamesData.json';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

console.log('gamesData', gamesData);
const items = gamesData.games;


function Items({ currentItems }) {
  return (
    <>
      <div class="columns">
        {currentItems &&
          currentItems.map((item) => (
            <div class="column col-3 col-md-6 col-sm-12">
              <div class="card m-1 p-centered">
                <div class="card-header">
                <a href={`/Games/${item.gameUrl}`} target='_blank'><div class="card-title h5">{item.gameTitle}</div></a>
                </div>
                <div class="card-image">
                <a href={`/Games/${item.gameUrl}`} target='_blank'><img src={`/images/${item.thumbnailUrl}`} width="100%" height="157px" alt={item.gameTitle} /></a>
                </div>
                <div class="card-footer">
                <a href={`/Games/${item.gameUrl}`} target='_blank'><button class="btn btn-primary">Play</button></a>
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
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className='pagination col-12 p-centered'
        nextClassName='page-item float-left btn btn-primary'
        nextLinkClassName='text-secondary'
        previousClassName='page-item float-left btn btn-primary'
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
