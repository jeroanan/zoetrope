const LabelValueRow = ({label, value}) => {
  return (
    <div className="row">
      <div className="col-xs-1 col-lg-2"></div>
      <div className="col-xs-5 col-lg-4">{label}</div>
      <div className="col-xs-5 col-lg-4">{value}</div>
      <div className="col-xs-1 col-lg-2"></div>
    </div>
  );
  
};

export { LabelValueRow }
