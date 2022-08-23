import React from "react";
import "./AppDialog.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AppDialog = ({ isOpen, isLoading, title, onConfirm, onCancel }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle className="dialog-title">{title}</DialogTitle>
      {!isLoading && (
        <DialogActions>
          <button onClick={onCancel} className="dialog-action">
            Cancel
          </button>
          <button onClick={onConfirm} className="dialog-action action-confirm">
            Confirm
          </button>
        </DialogActions>
      )}
      {isLoading && (
        <DialogContent>
          <LoadingSpinner />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AppDialog;
