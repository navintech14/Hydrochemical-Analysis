import react from "react";
import { Button } from "reactstrap";

const hcaButton = (text, className, onClick, ...rest) => {
  return (
    <Button className={className} onClick={onClick}>
      {text}
    </Button>
  );
};
