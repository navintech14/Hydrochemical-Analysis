import React, { useState } from "react";
import { Input } from "reactstrap";
import { get } from "lodash";

const ManualEntryTableInput = ({ values, name, handleChange, ...rest }) => {
  const [value, setValue] = useState(get(values, name));
  return (
    <Input
      name={name}
      value={value}
      onChange={(evt) => {
        setValue(evt.target.value);
      }}
      onBlur={(evt) => {
        handleChange(evt);
      }}
      {...rest}
    />
  );
};

export default ManualEntryTableInput;
