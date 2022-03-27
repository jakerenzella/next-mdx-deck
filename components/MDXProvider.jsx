import React from "react";
import { useContext } from "react";
import { MDXProvider } from "@mdx-js/react";

import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";
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
    // console.log(value);
    return (
      <Code
        className={className}
        language={language}
        style={okaidia}
        {...props}
      />
    );
  },
  // Code: (props) =>{
  //   const { className } = props;
  //   const language = className.replace("language-", "");
  //   return (
  //     <SyntaxHighlighter
  //       className={className}
  //       language={language}
  //       style={okaidia}
  //       {...props}
  //     />
  //   );
  // },
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
