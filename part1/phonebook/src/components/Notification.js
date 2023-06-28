import "../App.css";

const Notification = ({ status }) => {
  if (status.message === null) {
    return null;
  }
  return <div className={status.status}>{status.message}</div>;
};

export default Notification;
