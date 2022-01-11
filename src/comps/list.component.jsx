import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

const mapFilter = {
  key1: "men's clothing",
  key2: "jewelery",
  key3: "electronics",
  key4: "women's clothing",
};

function loadpage(pageindex, data) {
  const limit = Math.min(data.length, 5);
  const page = pageindex || 1;

  const nextpage = (page - 1) * limit;

  const result = {};
  result.pages = Math.ceil(data.length / limit);
  result.data = data.slice(nextpage, page * limit);

  if (page * limit < data.length) {
    result.nextPage = page + 1;
  }

  if (page > 1) {
    result.previousPage = page - 1;
  }

  return result;
}

function List() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagedata, setPagedata] = useState([]);
  const [pages, setPages] = useState([]);

  const [page, setPage] = useState(1);
  const [filterValue, setFilter] = useState(null);

  const [sortValue, setSort] = useState(null);

  useEffect(() => {
    let datas = data;
    if (datas.length > 0) {
      if (filterValue !== null) {
        datas = datas.filter(
          (item) => item.category === mapFilter[filterValue]
        );
      }

      if (sortValue !== null) {
        datas = datas.sort((item, item1) => {
          if (sortValue === "rating") {
            return item.rating.rate - item1.rating.rate;
          }

          return item[sortValue] - item1[sortValue];
        });
      }

      const { data: pdata, ...result } = loadpage(page, datas);
      setPages(result.pages);
      setPagedata(pdata);
    }
  }, [data, page, filterValue, sortValue]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://fakestoreapi.com/products"
        );

        const { data: pdata } = loadpage(1, response);

        setPagedata(pdata);
        setData(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="List">
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="p-2">
          <h2>Doing stuff with data</h2>
          <div className="row p-2">
            <div className="col-3">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setSort(e.target.value)}
              >
                <option>Tri Par</option>
                <option value="price">Prix</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="col-3">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown button
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setFilter("key1")}
                    >
                      men's clothing
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setFilter("key2")}
                    >
                      jewelery
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setFilter("key3")}
                    >
                      electronics
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setFilter("key4")}
                    >
                      women's clothing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            {pagedata.map((item) => (
              <tbody>
                <tr key={item.id}>
                  {/* <th scope="row">1</th> */}
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>
                    {" "}
                    <img src={item.image} alt="img" className="img-produit" />
                  </td>
                  <td>{item.rating.rate}</td>
                </tr>
              </tbody>
            ))}
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {page > 1 && (
                <li className="page-item">
                  <a className="page-link" onClick={() => setPage(page - 1)}>
                    Previous
                  </a>
                </li>
              )}
              {Array(pages)
                .fill(1)
                .map((_, i) => (
                  <li className={page === (i+1) ? 'page-item active' : 'page-item'}>
                    <a className="page-link" onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </a>
                  </li>
                ))}
              {page < pages && (
                <li className="page-item">
                  <a className="page-link" onClick={() => setPage(page + 1)}>
                    Next
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default List;
