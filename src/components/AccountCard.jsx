import { useState } from "react";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import UpdateBankModal from "./UpdateBankModal";
import DeleteBankModal from "./DeleteBankModal";

const AccountCard = ({
  account,
  bankId,
  updateBankInList,
  deleteBankFromList,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleUpdateModal = () => setShowUpdateModal(!showUpdateModal);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  return (
    <div className="mb-3">
      <div className="card shadow-lg mb-3">
        <div className="card-body">
          {/* Bank Account Details */}
          <div>
            <strong>A/C No.: </strong> {account.accountNumber}
          </div>
          <div>
            <strong>Bank Name: </strong> {account.bankName}
          </div>
          <div>
            <strong>Branch Name: </strong> {account.branchName}
          </div>
          <div>
            <strong>IFSC Code: </strong> {account.IFSC_Code}
          </div>
          <div>
            <strong>Account Holder Name: </strong> {account.accountHolderName}
          </div>

          {/* Underline */}
          <hr />

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-primary btn-sm mx-2"
              onClick={toggleUpdateModal}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={toggleDeleteModal}
            >
              <FaRegWindowClose />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateBankModal
        showUpdateModal={showUpdateModal}
        toggleUpdateModal={toggleUpdateModal}
        bankId={bankId}
        account={account}
        updateBankInList={updateBankInList}
      />
      <DeleteBankModal
        showDeleteModal={showDeleteModal}
        toggleDeleteModal={toggleDeleteModal}
        deleteBankFromList={deleteBankFromList}
        bankId={bankId}
      />
    </div>
  );
};

export default AccountCard;
