import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCard from "../components/AccountCard";
import AddBankAccountModal from "../components/AddBankAccountModal";
import { context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const BankDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const { setIsAuthenticated, setUser } = useContext(context);
  const navigate = useNavigate();
  const [bank, setBank] = useState([]);
  const { id } = useParams();
  const { loading, setLoading } = useContext(context);

  // Toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Logout function
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.msg);
      setIsAuthenticated(false);
      setUser({});
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Logout failed!");
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`${server}/bank-accounts/${id}`, { withCredentials: true })
      .then((res) => {
        setBank(res.data.banks);
        setLoading(false);
      })
      .catch((err) => {
        //toast.error(err.response?.data?.msg);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;

  const addBankToList = (newBank) => {
    setBank((prevBanks) => [...prevBanks, newBank]);
  };
  // Update the bank account in the list
  const updateBankInList = (updatedBank) => {
    setBank((prevState) =>
      prevState.map((account) =>
        account._id === updatedBank._id ? updatedBank : account
      )
    );
  };

  // Delete the bank account from the list
  const deleteBankFromList = (deletedBankId) => {
    setBank((prevState) =>
      prevState.filter((account) => account._id !== deletedBankId)
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-dark mb-4">Your Bank Accounts</h1>

      {/* Centering the main card */}
      <div className="d-flex justify-content-center">
        <div className="card shadow-lg p-4 custom-card" style={{ width: "60%" }}>
          <div className="d-flex justify-content-between">
            {/* Logout Button */}
            <button className="btn btn-danger txt" onClick={handleLogout}>
              Logout
            </button>

            {/* Button to open modal */}
            <button className="btn btn-warning txt" onClick={toggleModal}>
              Add New Bank
            </button>
          </div>

          <div className="mt-4">
            {bank.length > 0 ? (
              <div className="row">
                {bank.map((account) => (
                  <div key={account._id} className="col-12 col-md-6 mb-4">
                    <AccountCard
                      account={account}
                      bankId={account._id}
                      updateBankInList={updateBankInList}
                      deleteBankFromList={deleteBankFromList}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <h4>No bank added!</h4>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddBankAccountModal
        showModal={showModal}
        toggleModal={toggleModal}
        addBankToList={addBankToList}
      />
    </div>
  );
};

export default BankDetails;
