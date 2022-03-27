import React from "react";
import { MDXProvider } from "@mdx-js/react";

import SlidePage from "../layouts/SlidePage";
import Cover from "./Cover";
import SpeakerNotes from "./SpeakerNotes";
import Step from "./Step";
import Steps from "./Steps";
import Code from "./Code";
import { motion } from "framer-motion";

const mdComponents = {
  h1: (props) => <h1 {...props} />,
  pre: (props) => props.children,
  code: (props) => {
    const { className } = props;
    const language = className.replace("language-", "");
    return <Code code={props.children} language={language} />;
  },

  Cover,
  SlidePage,
  SpeakerNotes,
  Step,
  Steps,
  motion,
};

export default ({ children }) => (
  <MDXProvider components={mdComponents}>{children}</MDXProvider>
);
