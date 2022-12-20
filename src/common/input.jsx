const Input = ({ error, label, name, ...rest }) => {
  return (
    <>
      <div className="form-group my-1">
        <label>
          {label}
          {rest.required && <span className="text-danger">*</span>}
        </label>
        <input
          {...rest}
          type={name}
          id={name}
          className={["form-control", error && "is-invalid"]
            .filter(Boolean)
            .join(" ")}
        />
        <span className="text-danger">{error}</span>
      </div>
    </>
  );
};

export default Input;
