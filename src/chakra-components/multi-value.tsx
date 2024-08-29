import React from "react";
import type {
  GroupBase,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
} from "react-select";
import type {SystemStyleObject, IconProps, ColorPalette} from "@chakra-ui/react";
import { chakra, useSlotRecipe, Icon, Box} from "@chakra-ui/react";
import { useSize } from "../utils";
import type {TagVariant} from "../types.js";

const hasColorScheme = (option: unknown): option is { colorPalette: ColorPalette } =>
  typeof option === "object" &&
  option !== null &&
  "colorPalette" in option &&
  typeof option.colorPalette === "string";

const hasVariant = (option: unknown): option is { variant: TagVariant } =>
  typeof option === "object" &&
  option !== null &&
  "variant" in option &&
  typeof option.variant === "string";

const hasIsFixed = (option: unknown): option is { isFixed: boolean } =>
  typeof option === "object" &&
  option !== null &&
  "isFixed" in option &&
  typeof option.isFixed === "boolean";

const MultiValue = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    components,
    cx,
    data,
    innerProps,
    isDisabled,
    isFocused,
    removeProps,
    selectProps,
    cropWithEllipsis,
  } = props;

  const { Container, Label, Remove } = components;

  const { chakraStyles, colorPalette, tagVariant, size: sizeProp } = selectProps;

  const size = useSize(sizeProp);

  let optionColorPalette: ColorPalette | undefined = undefined;
  let optionVariant: TagVariant | undefined;
  let optionIsFixed = false;

  if (hasColorScheme(data)) {
    optionColorPalette = data.colorPalette;
  }

  if (hasVariant(data)) {
    optionVariant = data.variant;
  }

  if (hasIsFixed(data)) {
    optionIsFixed = data.isFixed;
  }

  const tagRecipe = useSlotRecipe({ key: "tag" })
  const tagStyles = tagRecipe({
    size,
    colorPalette: optionColorPalette || colorPalette,
    variant:
      optionVariant || tagVariant || (optionIsFixed ? "solid" : "subtle"),
  })

  const containerInitialCss: SystemStyleObject = {
    ...tagStyles.root,
    display: "flex",
    alignItems: "center",
    minWidth: 0, // resolves flex/text-overflow bug
    margin: "0.125rem",
  };
  const containerCss: SystemStyleObject = chakraStyles?.multiValue
    ? chakraStyles.multiValue(containerInitialCss, props)
    : containerInitialCss;

  const labelInitialCss: SystemStyleObject = {
    ...tagStyles.label,
    overflow: "hidden",
    textOverflow:
      cropWithEllipsis || cropWithEllipsis === undefined
        ? "ellipsis"
        : undefined,
    whiteSpace: "nowrap",
  };
  const labelCss = chakraStyles?.multiValueLabel
    ? chakraStyles.multiValueLabel(labelInitialCss, props)
    : labelInitialCss;

  const removeInitialCss: SystemStyleObject = {
    ...tagStyles.closeTrigger,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const removeCss = chakraStyles?.multiValueRemove
    ? chakraStyles.multiValueRemove(removeInitialCss, props)
    : removeInitialCss;

  return (
    <Container
      data={data}
      innerProps={{
        className: cx(
          {
            "multi-value": true,
            "multi-value--is-disabled": isDisabled,
          },
          className
        ),
        ...innerProps,
      }}
      css={containerCss}
      selectProps={selectProps}
    >
      <Label
        data={data}
        innerProps={{
          className: cx(
            {
              "multi-value__label": true,
            },
            className
          ),
        }}
        css={labelCss}
        selectProps={selectProps}
      >
        {children}
      </Label>
      <Remove
        data={data}
        innerProps={{
          className: cx(
            {
              "multi-value__remove": true,
            },
            className
          ),
          "aria-label": `Remove ${children || "option"}`,
          ...removeProps,
        }}
        css={removeCss}
        selectProps={selectProps}
        isFocused={isFocused}
      />
    </Container>
  );
};

const MultiValueContainer = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueGenericProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, css } = props;

  return (
    <chakra.span {...innerProps} css={css}>
      {children}
    </chakra.span>
  );
};

const MultiValueLabel = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueGenericProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, css } = props;

  return (
    <chakra.span {...innerProps} css={css}>
      {children}
    </chakra.span>
  );
};

/**
 * Borrowed from Chakra UI Tag source
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/13c6d2e08b61e179773be4722bb81173dd599306/packages/tag/src/tag.tsx#L75}
 */
const TagCloseIcon = (props: IconProps) => (
  <Icon verticalAlign="inherit" viewBox="0 0 512 512" {...props}>
    <path
      fill="currentColor"
      d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
    />
  </Icon>
);

const MultiValueRemove = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueRemoveProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, isFocused, data, css } = props;

  if (hasIsFixed(data) && data.isFixed) {
    return null;
  }

  return (
    <Box
      {...innerProps}
      role="button"
      css={css}
      data-focus={isFocused ? true : undefined}
      data-focus-visible={isFocused ? true : undefined}
    >
      {children || <TagCloseIcon />}
    </Box>
  );
};

export { MultiValueContainer, MultiValueLabel, MultiValueRemove };
export default MultiValue;
