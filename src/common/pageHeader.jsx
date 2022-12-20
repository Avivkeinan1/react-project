const PageHeader = ({ title, description }) => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};
export default PageHeader;
