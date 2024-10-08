import React from "react";
import type { GroupBase, PlaceholderProps } from "react-select";
import type { SystemStyleObject} from "@chakra-ui/react";
import {Box} from "@chakra-ui/react";

const Placeholder = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: PlaceholderProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles },
  } = props;

  const initialCss: SystemStyleObject = {
    gridArea: "1 / 1 / 2 / 3",
    color: "chakra-placeholder-color",
    mx: "0.125rem",
    userSelect: "none",
  };

  const css = chakraStyles?.placeholder
    ? chakraStyles.placeholder(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          placeholder: true,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};

export default Placeholder;
