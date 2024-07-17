import React from "react";
import { useGetAllUsersQuery } from "../../redux/users/Services";
import ReactPaginate from 'react-paginate';

export default function TablesFooter({ handlePage, pagenum, tottlaPages }) {
  const data = { limit: 13, pagenum: 1 }
  const user = useGetAllUsersQuery(data);

  return (

    <div className="flex-end">
      <div className="row">
        <div className="col-lg-4 mt-4">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {parseInt(pagenum) > 1 ?

                <li className="page-item">
                  <a className="page-link" aria-label="Previous" onClick={() => handlePage(parseInt(pagenum) - 1)}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                :
                null}
              {parseInt(pagenum) + 1 < tottlaPages ?

                <li className="page-item">
                  <a className="page-link" onClick={() => handlePage(parseInt(pagenum) + 1)}>
                    {parseInt(pagenum) + 1}
                  </a>
                </li>
                :
                null}
              {parseInt(pagenum) + 2 < tottlaPages ?

                <li className="page-item">
                  <a className="page-link" onClick={() => handlePage(parseInt(pagenum) + 2)}>
                    {parseInt(pagenum) + 2}

                  </a>
                </li>
                :
                null}
              {parseInt(pagenum) + 3 < tottlaPages ?

                <li className="page-item">
                  <a className="page-link" onClick={() => handlePage(parseInt(pagenum) + 3)}>
                    {parseInt(pagenum) + 3}

                  </a>
                </li>
                :
                null}
              {parseInt(pagenum) < parseInt(tottlaPages) ?
                <li className="page-item">
                  <a className="page-link" aria-label="Next" onClick={() => handlePage(parseInt(pagenum) + 1)}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
                :
                null}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}