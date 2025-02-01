import axios from "axios";
import React, { useContext, useState } from "react";
import { context, server } from "../main";
import toast from "react-hot-toast";
import Loader from "./Loader";

const AddBankAccountModal = ({ showModal, toggleModal, addBankToList }) => {
  const [accountNumber, setAccountNumber] = useState();
  const [bankName, setBankName] = useState();
  const [branchName, setBranchName] = useState();
  const [IFSC_Code, setIFSC_Code] = useState();
  const [accountHolderName, setAccountHolderName] = useState();

  const { loading, setLoading } = useContext(context);

  const handleAddBank = async (e) => {
    e.preventDefault();
    toggleModal();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/bank-accounts`,
        { IFSC_Code, branchName, bankName, accountNumber, accountHolderName },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.msg);
      addBankToList(data.bank);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <>
      {/* Backdrop that applies the blur effect when the modal is open */}
      <div
        className={`backdrop ${showModal ? "show" : ""}`}
        onClick={toggleModal}
      ></div>

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Bank Account</h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleModal}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/* Form for Bank Details */}
              <form>
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    A/C No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="Enter Account Number"
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="bankName" className="form-label">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankName"
                    name="bankName"
                    placeholder="Enter Bank Name"
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="branchName" className="form-label">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="branchName"
                    name="branchName"
                    placeholder="Enter Branch Name"
                    onChange={(e) => setBranchName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="IFSC_Code" className="form-label">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="IFSC_Code"
                    name="IFSC_Code"
                    placeholder="Enter IFSC Code"
                    onChange={(e) => setIFSC_Code(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="accountHolderName" className="form-label">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accountHolderName"
                    name="accountHolderName"
                    placeholder="Enter Account Holder Name"
                    onChange={(e) => setAccountHolderName(e.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              {/* Green Add Bank Button */}
              <button className="btn btn-success" onClick={handleAddBank}>
                Add Bank
              </button>
              <button className="btn btn-secondary" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBankAccountModal;
