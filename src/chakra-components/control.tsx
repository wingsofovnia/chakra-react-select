import React from "react";
import type {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from "react-select";
import type { IconProps, SystemStyleObject} from "@chakra-ui/react";
import {Box, Icon, Separator, Spinner, useSlotRecipe} from "@chakra-ui/react";
import type { SizeProps } from "../types";
import { useSize } from "../utils";

const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ControlProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    children,
    innerRef,
    innerProps,
    isDisabled,
    isFocused,
    menuIsOpen,
    selectProps: {
      chakraStyles,
      size: sizeProp,
      variant,
      focusBorderColor,
      errorBorderColor,
      isInvalid,
      isReadOnly,
    },
  } = props;

  const size = useSize(sizeProp);
  const inputRecipe = useSlotRecipe({ key: "input" })
  const {
    field: { height, h, ...fieldStyles },
  } = inputRecipe({
    size,
    variant,
    focusBorderColor,
    errorBorderColor,
  })

  /**
   * `@chakra-ui/theme@3.2.0` introduced a breaking change that switched from using `h` to `height` for the Input sizing.
   *
   * We need to keep checking for either to maintain backwards compatibility.
   *
   * @see {@link https://github.com/chakra-ui/chakra-ui/releases/tag/%40chakra-ui%2Ftheme%403.2.0}
   */
  const minH = height || h;

  const initialCss: SystemStyleObject = {
    ...fieldStyles,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 0,
    overflow: "hidden",
    height: "auto",
    minH,
    ...(isDisabled ? { pointerEvents: "none" } : {}),
  };

  const css = chakraStyles?.control
    ? chakraStyles.control(initialCss, props)
    : initialCss;

  return (
    <Box
      ref={innerRef}
      className={cx(
        {
          control: true,
          "control--is-disabled": isDisabled,
          "control--is-focused": isFocused,
          "control--menu-is-open": menuIsOpen,
        },
        className
      )}
      css={css}
      {...innerProps}
      data-focus={isFocused ? true : undefined}
      data-focus-visible={isFocused ? true : undefined}
      data-invalid={isInvalid ? true : undefined}
      data-disabled={isDisabled ? true : undefined}
      data-readonly={isReadOnly ? true : undefined}
    >
      {children}
    </Box>
  );
};

export const IndicatorSeparator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: IndicatorSeparatorProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    selectProps: { chakraStyles, useBasicStyles, variant },
  } = props;

  const initialCss: SystemStyleObject = {
    opacity: 1,
    ...(useBasicStyles || variant !== "outline" ? { display: "none" } : {}),
  };

  const css = chakraStyles?.indicatorSeparator
    ? chakraStyles.indicatorSeparator(initialCss, props)
    : initialCss;

  return (
    <Separator
      className={cx({ "indicator-separator": true }, className)}
      css={css}
      orientation="vertical"
    />
  );
};

/**
 * Borrowed from the `@chakra-ui/icons` package to prevent needing it as a dependency
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/61f965a/packages/components/icons/src/ChevronDown.tsx}
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/61f965a/packages/components/select/src/select.tsx#L168-L179}
 */
export const DownChevron = (props: IconProps) => (
  <Icon role="presentation" focusable="false" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </Icon>
);

export const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: {
      chakraStyles,
      useBasicStyles,
      size: sizeProp,
      focusBorderColor,
      errorBorderColor,
      variant,
    },
  } = props;

  const size = useSize(sizeProp);
  const inputRecipe = useSlotRecipe({ key: "input" })
  const inputStyles = inputRecipe({
    size,
    variant,
    focusBorderColor,
    errorBorderColor,
  })

  const iconSizes: SizeProps = {
    sm: "16px",
    md: "20px",
    lg: "24px",
  };
  const iconSize = iconSizes[size];

  const initialDropdownIndicatorCss: SystemStyleObject = {
    ...inputStyles.addon,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 0,
    borderWidth: 0,
    fontSize: iconSize,
    ...(useBasicStyles && {
      background: "transparent",
      padding: 0,
      width: 6,
      marginRight: 2,
      marginLeft: 1,
      cursor: "inherit",
    }),
  };
  const dropdownIndicatorCss = chakraStyles?.dropdownIndicator
    ? chakraStyles.dropdownIndicator(initialDropdownIndicatorCss, props)
    : initialDropdownIndicatorCss;

  const initialDownChevronCss: SystemStyleObject = {
    height: "1em",
    width: "1em",
  };
  const downChevronCss = chakraStyles?.downChevron
    ? chakraStyles.downChevron(initialDownChevronCss, props)
    : initialDownChevronCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          indicator: true,
          "dropdown-indicator": true,
        },
        className
      )}
      css={dropdownIndicatorCss}
    >
      {children || <DownChevron css={downChevronCss} />}
    </Box>
  );
};

/**
 * Borrowed from Chakra UI source
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/61f965a/packages/components/close-button/src/close-button.tsx#L12-L21}
 */
export const CrossIcon = (props: IconProps) => (
  <Icon focusable="false" aria-hidden {...props}>
    <path
      fill="currentColor"
      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    />
  </Icon>
);

export const ClearIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size: sizeProp },
  } = props;

  const size = useSize(sizeProp);
  const closeButtonRecipe = useSlotRecipe({ key: "closeTrigger" })
  const closeButtonStyles = closeButtonRecipe({
    size,
  });

  const initialCss: SystemStyleObject = {
    ...closeButtonStyles,
    marginX: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
  };
  const css = chakraStyles?.clearIndicator
    ? chakraStyles.clearIndicator(initialCss, props)
    : initialCss;

  const initialIconStyles: SystemStyleObject = {
    width: "1em",
    height: "1em",
  };
  const iconCss: SystemStyleObject = chakraStyles?.crossIcon
    ? chakraStyles.crossIcon(initialIconStyles, props)
    : initialIconStyles;

  return (
    <Box
      role="button"
      className={cx(
        {
          indicator: true,
          "clear-indicator": true,
        },
        className
      )}
      css={css}
      aria-label="Clear selected options"
      {...innerProps}
    >
      {children || <CrossIcon css={iconCss} />}
    </Box>
  );
};

export const LoadingIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: LoadingIndicatorProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size: sizeProp },
    color,
    emptyColor,
    speed,
    thickness,
    spinnerSize: propsSpinnerSize,
  } = props;

  const size = useSize(sizeProp);
  const spinnerSizes: SizeProps<"xs" | "sm" | "md"> = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };
  const spinnerSize = spinnerSizes[size];

  const initialCss: SystemStyleObject = { marginRight: 3 };

  const css = chakraStyles?.loadingIndicator
    ? chakraStyles.loadingIndicator(initialCss, props)
    : initialCss;

  return (
    <Spinner
      className={cx(
        {
          indicator: true,
          "loading-indicator": true,
        },
        className
      )}
      css={{
        ...css,
        "--spinner-track-color": emptyColor,
      }}

      {...innerProps}
      size={propsSpinnerSize || spinnerSize}
      color={color}
      animationDuration={speed}
      borderWidth={thickness}
    />
  );
};

export default Control;
