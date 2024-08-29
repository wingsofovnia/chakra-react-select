import React from "react";
import type {
  ContainerProps,
  GroupBase,
  IndicatorsContainerProps,
  ValueContainerProps,
} from "react-select";
import type { SystemStyleObject} from "@chakra-ui/react";
import {Box, useSlotRecipe} from "@chakra-ui/react";
import { useSize } from "../utils";

export const SelectContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    isDisabled,
    isRtl,
    hasValue,
    selectProps: { chakraStyles },
  } = props;

  const initialCss: SystemStyleObject = {
    position: "relative",
    direction: isRtl ? "rtl" : undefined,
    ...(isDisabled ? { cursor: "not-allowed" } : {}),
  };

  const css = chakraStyles?.container
    ? chakraStyles.container(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "--is-disabled": isDisabled,
          "--is-rtl": isRtl,
          "--has-value": hasValue,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};

export const ValueContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ValueContainerProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    isMulti,
    hasValue,
    innerProps,
    selectProps: {
      chakraStyles,
      size: sizeProp,
      variant,
      focusBorderColor,
      errorBorderColor,
      controlShouldRenderValue,
    },
  } = props;

  const size = useSize(sizeProp);

  // Getting the css from input instead of select
  // to fit better with each of the variants
  const inputRecipe = useSlotRecipe({ key: "input" })
  const inputStyles = inputRecipe({
    size,
    variant,
    focusBorderColor,
    errorBorderColor,
  })

  const initialCss: SystemStyleObject = {
    display: isMulti && hasValue && controlShouldRenderValue ? "flex" : "grid",
    alignItems: "center",
    flex: 1,
    paddingY: "2px",
    paddingX: inputStyles.field.px,
    flexWrap: "wrap",
    WebkitOverflowScrolling: "touch",
    position: "relative",
    overflow: "hidden",
  };

  const css = chakraStyles?.valueContainer
    ? chakraStyles.valueContainer(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "value-container": true,
          "value-container--is-multi": isMulti,
          "value-container--has-value": hasValue,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};

export const IndicatorsContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: IndicatorsContainerProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles },
  } = props;

  const initialCss: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    flexShrink: 0,
  };

  const css = chakraStyles?.indicatorsContainer
    ? chakraStyles.indicatorsContainer(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          indicators: true,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};
