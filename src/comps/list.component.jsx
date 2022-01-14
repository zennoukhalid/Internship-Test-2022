import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import { Rate } from "antd";

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
      {loading && (
        <div class="loadingio-spinner-spinner-anpj18jrds5">
          <div class="ldio-lsxdl9mydei">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {!loading && (
        <div className="p-2">
          <div className="row p-2">
            <div className="col-6">
              <div className="dropdown">
                <button
                  className="btn btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Order By
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setSort("price")}
                    >
                      Price
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setSort("rating")}
                    >
                      Rating
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="dropdown1">
                <button
                  className="btn btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
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
          <table className="table">
            <thead className="thead-primary">
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>
              {pagedata.map((item) => (
                <tr className="alert" role="alert">
                  <td>
                    <img
                      src={item.image}
                      alt="img"
                      className={
                        item.category === "men's clothing" ||
                        item.category === "jewelery"
                          ? "img"
                          : "img1"
                      }
                    />
                  </td>
                  <td>
                    <div className="email">
                      <span>
                        <b>Title:</b> {item.title}{" "}
                      </span>
                      <span>
                        <b>Description:</b> {item.description}
                      </span>
                    </div>
                  </td>
                  <td>{item.price}$</td>
                  <td className="category">{item.category}</td>
                  <td>{item.rating.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
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
                  <li
                    className={
                      page === i + 1 ? "page-item active" : "page-item"
                    }
                  >
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
