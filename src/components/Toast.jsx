const Toast = ({message}) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-info">
        <span className="font-bold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
