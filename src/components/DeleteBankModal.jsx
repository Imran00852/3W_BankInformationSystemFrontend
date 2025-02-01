import axios from "axios";
import React, { useContext } from "react";
import { context, server } from "../main";
import toast from "react-hot-toast";
import Loader from "./Loader";

const DeleteBankModal = ({
  showDeleteModal,
  toggleDeleteModal,
  bankId,
  deleteBankFromList,
}) => {
  const { loading, setLoading } = useContext(context);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${server}/bank-accounts/${bankId}`, {
        withCredentials: true,
      });
      toast.success(data.msg);
      deleteBankFromList(bankId);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };
  if (loading) return <Loader />;
  return (
    <div
      className={`modal fade ${showDeleteModal ? "show" : ""}`}
      style={{
        display: showDeleteModal ? "block" : "none",
        background: "rgba(0,0,0,0.5)",
      }}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggleDeleteModal}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body text-center">
            <p>Are you sure you want to remove your account?</p>
          </div>

          <div className="modal-footer d-flex justify-content-center">
            <button className="btn btn-danger" onClick={handleDelete}>
              Confirm
            </button>
            <button className="btn btn-secondary" onClick={toggleDeleteModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBankModal;
