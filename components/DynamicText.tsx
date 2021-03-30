import React, { useState } from "react";
import { Heading } from "@chakra-ui/react"

const DynamicText = () => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue: string) => {
    setValue(newValue);
  };

  return <Heading as="h1">{value}</Heading>;
};

export default DynamicText;
