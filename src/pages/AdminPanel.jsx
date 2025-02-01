import { useState, useEffect, useContext } from "react";
import { FaSearch, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { context, server } from "../main";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search term
  const [loading, setLoading] = useState(false); // Local loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users initially if the searchQuery is empty
    if (!searchQuery) {
      setLoading(true);
      axios
        .get(`${server}/admin/users`)
        .then((res) => {
          setUsers(res.data.users);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.msg || "Failed to fetch users");
          setLoading(false);
        });
    }
  }, [searchQuery]);

  // Function to handle admin logout
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast.success("Logged out successfully!");
    navigate("/admin-login");
  };

  // Function to open modal with selected user's bank details
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Function to handle the search input change and API call
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const searchParams = {};

      if (searchQuery.trim()) {
        searchParams.username = searchQuery;
      }

      const { data } = await axios.get(`${server}/admin/users/search`, {
        params: searchParams,
      });

      if (data.users && data.users.length > 0) {
        setUsers(data.users);
      } else {
        toast.error("No users found with the given search criteria.");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the search query submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold">Admin Panel</h2>

      {/* Logout Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-danger d-flex align-items-center"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>

      {/* Search Bar */}
      <div
        className="input-group mb-4 shadow-sm"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <span className="input-group-text bg-primary text-white">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* User List */}
      {!loading && (
        <div className="list-group shadow">
          {users.length > 0 ? (
            users.map((user, index) => (
              <button
                key={index}
                className="list-group-item list-group-item-action py-3 px-4 text-dark fw-semibold border-0"
                style={{ transition: "0.3s" }}
                onClick={() => openModal(user)}
              >
                {user.username}
              </button>
            ))
          ) : (
            <h4 className="text-center text-muted">No users found!</h4>
          )}
        </div>
      )}

      {/* Bank Details Modal */}
      {showModal && selectedUser && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {selectedUser.username}'s Bank Accounts
                </h5>
                <button
                  type="button"
                  className="btn-close text-white"
                  style={{ filter: "brightness(0) invert(1)" }}
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {selectedUser.banks && selectedUser.banks.length > 0 ? (
                  [
                    ...new Map(
                      selectedUser.banks.map((bank) => [
                        bank.accountNumber,
                        bank,
                      ])
                    ).values(),
                  ].map((bank, index) => (
                    <div key={index} className="card mb-3 border-0 shadow-sm">
                      <div className="card-body">
                        <p>
                          <strong>A/C No.:</strong> {bank.accountNumber}
                        </p>
                        <p>
                          <strong>Bank Name:</strong> {bank.bankName}
                        </p>
                        <p>
                          <strong>Branch Name:</strong> {bank.branchName}
                        </p>
                        <p>
                          <strong>IFSC Code:</strong> {bank.IFSC_Code}
                        </p>
                        <p>
                          <strong>Account Holder Name:</strong>{" "}
                          {bank.accountHolderName}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4 className="text-center text-muted">
                    No banks available for this user!
                  </h4>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger d-flex align-items-center"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes className="me-2" /> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
