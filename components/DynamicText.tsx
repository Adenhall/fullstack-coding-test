import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Heading } from "@chakra-ui/react";

type dynamicHeadingRef = {
  changeValue: (newValue: string) => void
}

const DynamicText = forwardRef<dynamicHeadingRef>((_, ref) => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue: string) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
    changeValue,
  }));

  return (
    <Heading ref={ref as any} as="h1">
      {value}
    </Heading>
  );
});

export default DynamicText;
