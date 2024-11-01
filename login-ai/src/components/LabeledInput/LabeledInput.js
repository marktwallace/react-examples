import React from 'react';

function LabeledInput({label,...delegated}) {
  const id = React.useId();
  return (
  <div>
      <p htmlFor={id} className="label">{label}</p>
      <input
        id={id}
        placeholder=" " /* avoids safari bug on baseline alignment */
        {...delegated}
      />
  </div>);
}

export default LabeledInput;
