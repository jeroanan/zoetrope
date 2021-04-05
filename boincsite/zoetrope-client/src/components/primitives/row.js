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

const FourColumnRow = ({col1, col2}) => {

  const { col1Label, col1Value } = col1;
  const { col2Label, col2Value } = col2;

  return (
    <div className="row">
      <div className="col-3">{col1Label}</div>
      <div className="col-3">{col1Value}</div>
      <div className="col-3">{col2Label}</div>
      <div className="col-3">{col2Value}</div>
    </div>
  );
};

export { 
  LabelValueRow,
  FourColumnRow,
};
