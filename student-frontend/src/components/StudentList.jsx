import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

// RAFCE -> react arrow function component export

const StudentList = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize] = useState(10);

  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isSorted, setIsSorted] = useState(false);

  // --- NEW: Search state ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  // --- NEW: Fetch search results ---
  const fetchSearch = async (term) => {
    if (!term.trim()) {
      // If search is empty, reset to paginated view
      setIsSearching(false);
      fetchPage(0);
      return;
    }
    setLoading(true);
    setIsSearching(true);
    try {
      const response = await axios.get(`http://localhost:8080/students/search`, {
        params: { name: term }
      });
      setStudents(response.data);      // response.data is the list of matching students
      setTotalPage(0);                 // hide pagination
    } catch (error) {
      console.log("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSorted = async () => {
    setLoading(true);
    setIsSorted(true);
    try {
      const response = await axios.get(`http://localhost:8080/students/sorting`, {
        params: {
          sort: sortField,
          order: sortOrder,
        },
      });
      setStudents(response.data);
      setTotalPage(0);
    } catch (error) {
      console.log("Failed to sort:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPage = async (page) => {
    setLoading(true);
    setIsSorted(false);
    try {
      const response = await axios.get(`http://localhost:8080/students/fetchPage`, {
        params: {
          pageNumber: page,
          pageSize: pageSize
        }
      });
      setStudents(response.data.content);
      setTotalPage(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Load first page on mount
  useEffect(() => {
    fetchPage(0);
  }, []);

  // --- NEW: Debounced search effect (fires 500ms after typing stops) ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        fetchSearch(searchTerm);
      } else {
        // If search is cleared, revert to paginated view
        setIsSearching(false);
        fetchPage(0);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleDelete = (id) => {
    if (window.confirm('Are You sure u want to delete This Student?')) {
      axios.delete(`http://localhost:8080/students/delete?id=${id}`)
        .then(() => {
          if (isSorted) {
            fetchSorted();
          } else if (isSearching) {
            // If we're in search mode, re-run the search after deletion
            fetchSearch(searchTerm);
          } else {
            fetchPage(currentPage);
          }
        })
        .catch((err) => {
          console.log('Failed to Delete', err);
        });
    }
  };

  const goToPage = (page) => {
    if (page >= 0 && page < totalPage) {
      fetchPage(page);
    }
  }

  const toggleOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const applySort = () => {
    fetchSorted();
  };

  const resetToPagination = () => {
    fetchPage(0);
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container my-4 p-2">
      <h2 className='text-center my-2 p-2'>Student List</h2>

      <div className="container text-end">
        {/* --- MODIFIED: Control row now includes search input and Clear button --- */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-8 d-flex gap-2 flex-wrap">
            {/* Search input */}
            <input
              type="text"
              className="form-control w-auto"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Clear button – visible only during active search */}
            {isSearching && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}

            {/* Sort dropdown and buttons (unchanged) */}
            <select
              className="form-select w-auto"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="id">ID</option>
              <option value="firstname">First Name</option>
              <option value="lastname">Last Name</option>
              <option value="age">Age</option>
              <option value="standard">Standard</option>
              <option value="fees">Fees</option>
            </select>

            <button
              className="btn btn-outline-secondary"
              onClick={toggleOrder}
              type="button"
            >
              {sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </button>

            <button
              className="btn btn-primary"
              onClick={applySort}
            >
              Sort
            </button>

            {isSorted && (
              <button
                className="btn btn-warning"
                onClick={resetToPagination}
              >
                Reset to Pagination
              </button>
            )}
          </div>

          <div className="col-md-4 text-end">
            <NavLink className="btn btn-success" to="/addStudent" role="button">
              Add Student
            </NavLink>
          </div>
        </div>
      </div>

      {/* Table (unchanged) */}
      <div className="table-responsive rounded">
        <table className="table table-hover">
          <thead className='table-dark'>
            <tr>
              <th>Student Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Student Age</th>
              <th>Standard</th>
              <th>Student Fees</th>
              <th>Action</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No students found</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.age}</td>
                  <td>{student.standard}</td>
                  <td>{student.fees}</td>
                  <td>
                    <NavLink
                      className="btn btn-warning"
                      to={`/editStudent/${student.id}`}
                      role="button"
                    >
                      Edit
                    </NavLink>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODIFIED: Pagination hidden during search or sorted view --- */}
      {!isSorted && !isSearching && totalPage > 0 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                «
              </button>
            </li>
            {[...Array(totalPage).keys()].map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => goToPage(page)}>
                  {page + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPage - 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                »
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

export default StudentList