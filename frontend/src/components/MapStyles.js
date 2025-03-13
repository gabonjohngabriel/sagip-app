import { makeStyles } from "@mui/styles";

const useMapStyles = makeStyles(() => ({
  trafficAlertButton: {
    background: "white",
    border: "2px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    cursor: "pointer",
    marginTop: "10px",
    "&.active": {
      background: "#f0f0f0",
      boxShadow: "inset 0 0 5px rgba(0,0,0,0.2)",
    },
  },

  commuterGuideButton: {
    background: "white",
    border: "2px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    cursor: "pointer",
  },

  commuterGuideModal: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  commuterGuideContent: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
  },

  commuterInfo: {
    background: "#f0f8ff",
    borderLeft: "3px solid #4682B4",
    padding: "8px",
    marginTop: "8px",
  },

  commuterButton: {
    background: "#4682B4 !important",
    color: "white !important",
  },

  trafficTooltip: {
    fontWeight: "bold",
  },

  closeGuideButton: {
    background: "#4682B4",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  },

  hospitalTransportInfo: {
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "10px",
  },

  emergencyButton: {
    background: "white",
    border: "2px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    cursor: "pointer",
  },

  trafficPopupTitle: {
    margin: "0 0 8px 0",
    color: "#333",
  },

  trafficPopupText: {
    margin: "0",
    fontSize: "13px",
  },

  hospitalTooltip: {
    fontWeight: "bold",
    fontSize: "14px",
  },

  exitButton: {
    background: "white",
    padding: "8px 12px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "2px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    "&:hover": {
      background: "#f0f0f0",
    },
  },
}));

export default useMapStyles;
