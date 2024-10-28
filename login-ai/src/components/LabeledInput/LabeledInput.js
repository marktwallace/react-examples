import React from 'react';

function LabeledInput({label,...delegated}) {
  const id = React.useId();
  return (
  <div>
      <p htmlFor={id} className="label">{label}</p>
      <input
        id={id}
        {...delegated}
      />
  </div>);
}

export default LabeledInput;
