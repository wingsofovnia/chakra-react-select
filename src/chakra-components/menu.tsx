import React from "react";
import type {
  CoercedMenuPlacement,
  GroupBase,
  GroupHeadingProps,
  GroupProps,
  MenuListProps,
  MenuProps,
  NoticeProps,
  OptionProps,
} from "react-select";
import type { SystemStyleObject} from "@chakra-ui/react";
import {Box, Icon, Menu as ChakraMenu, useSlotRecipe} from "@chakra-ui/react";
import type {PropsOf} from "@emotion/react";
import type {SizeProps} from "../types";
import { cleanCommonProps, useSize } from "../utils";

const alignToControl = (placement: CoercedMenuPlacement) => {
  const placementToCSSProp = { bottom: "top", top: "bottom" };
  return placement ? placementToCSSProp[placement] : "top";
};

const Menu = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: MenuProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    children,
    innerProps,
    innerRef,
    placement,
    selectProps: { chakraStyles },
  } = props;

  // @ts-ignore
  const initialCss: SystemStyleObject = {
    position: "absolute",
    [alignToControl(placement)]: "100%",
    marginY: "8px",
    width: "100%",
    zIndex: 1,
  };

  const css = chakraStyles?.menu
    ? chakraStyles.menu(initialCss, props)
    : initialCss;

  return (
    <ChakraMenu.Root>
      <Box
        {...innerProps}
        ref={innerRef}
        className={cx({ menu: true }, className)}
        css={css}
      >
        {children}
      </Box>
    </ChakraMenu.Root>
  );
};

export default Menu;

export const MenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: MenuListProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    innerRef,
    children,
    maxHeight,
    isMulti,
    innerProps,
    selectProps: {
      chakraStyles,
      size: sizeProp,
      variant,
      focusBorderColor,
      errorBorderColor,
    },
  } = props;

  const menuRecipe = useSlotRecipe({ key: "menu" })
  const menuStyles = menuRecipe({})

  // We're pulling in the border radius from the theme for the input component
  // so we can match the menu lists' border radius to it, but in 2.8.0 the value
  // was changed to being pulled from a theme variable instead of being hardcoded
  const size = useSize(sizeProp);
  const inputRecipe = useSlotRecipe({ key: "input" })
  const inputStyles = inputRecipe({
    size,
    variant,
    focusBorderColor,
    errorBorderColor,
  })
  const fieldStyles = inputStyles.field;

  const initialCss: SystemStyleObject = {
    ...menuStyles.content,
    minW: "100%",
    maxHeight: `${maxHeight}px`,
    overflowY: "auto",
    // This is hacky, but it works. May be removed in the future
    "--input-border-radius": fieldStyles?.["--input-border-radius"],
    borderRadius: fieldStyles?.borderRadius || menuStyles.content?.borderRadius,
    position: "relative", // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: "touch",
  };

  const css = chakraStyles?.menuList
    ? chakraStyles.menuList(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "menu-list": true,
          "menu-list--is-multi": isMulti,
        },
        className
      )}
      css={css}
      ref={innerRef}
    >
      {children}
    </Box>
  );
};

export const LoadingMessage = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: NoticeProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size: sizeProp },
  } = props;

  const size = useSize(sizeProp);

  const verticalPaddings: SizeProps = {
    sm: "6px",
    md: "8px",
    lg: "10px",
  };

  const initialCss: SystemStyleObject = {
    color: "chakra-subtle-text",
    textAlign: "center",
    paddingY: verticalPaddings[size],
    fontSize: size,
  };

  const css = chakraStyles?.loadingMessage
    ? chakraStyles.loadingMessage(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "menu-notice": true,
          "menu-notice--loading": true,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};

export const NoOptionsMessage = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: NoticeProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles, size: sizeProp },
  } = props;

  const size = useSize(sizeProp);

  const verticalPaddings: SizeProps = {
    sm: "6px",
    md: "8px",
    lg: "10px",
  };

  const initialCss: SystemStyleObject = {
    color: "chakra-subtle-text",
    textAlign: "center",
    paddingY: verticalPaddings[size],
    fontSize: size,
  };

  const css = chakraStyles?.noOptionsMessage
    ? chakraStyles.noOptionsMessage(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "menu-notice": true,
          "menu-notice--no-options": true,
        },
        className
      )}
      css={css}
    >
      {children}
    </Box>
  );
};

export const Group = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: GroupProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    theme,
    getStyles,
    Heading,
    headingProps,
    label,
    selectProps,
    innerProps,
    getClassNames,
  } = props;

  const { chakraStyles } = selectProps;

  const initialCss: SystemStyleObject = {};
  const css = chakraStyles?.group
    ? chakraStyles.group(initialCss, props)
    : initialCss;

  return (
    <Box {...innerProps} className={cx({ group: true }, className)} css={css}>
      <Heading
        {...headingProps}
        selectProps={selectProps}
        cx={cx}
        theme={theme}
        getStyles={getStyles}
        getClassNames={getClassNames}
      >
        {label}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );
};

export const GroupHeading = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: GroupHeadingProps<Option, IsMulti, Group>
) => {
  const {
    cx,
    className,
    selectProps: { chakraStyles, size: sizeProp },
  } = props;

  const { data, ...innerProps } = cleanCommonProps(props);

  const menuRecipe = useSlotRecipe({ key: "menu" })
  const menuStyles = menuRecipe({})

  const size = useSize(sizeProp);

  const fontSizes: SizeProps = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };
  const paddings: SizeProps = {
    sm: "0.4rem 0.8rem",
    md: "0.5rem 1rem",
    lg: "0.6rem 1.2rem",
  };

  const initialCss: SystemStyleObject = {
    ...menuStyles.itemGroup,
    fontSize: fontSizes[size],
    padding: paddings[size],
    margin: 0,
    borderBottomWidth: 0,
    position: "static",
    top: -2,
    bg: menuStyles.content.bg,
    zIndex: 1,
  };

  const css = chakraStyles?.groupHeading
    ? chakraStyles.groupHeading(initialCss, props)
    : initialCss;

  return (
    <Box
      {...innerProps}
      className={cx({ "group-heading": true }, className)}
      css={css}
    />
  );
};

/**
 * The `CheckIcon` component from the Chakra UI Menu
 *
 * @see {@link https://github.com/chakra-ui/chakra-ui/blob/eb0316ddf96dd259433724062e923c33e6eee729/packages/components/menu/src/menu-item-option.tsx#L10-L17}
 */
const CheckIcon: React.FC<PropsOf<"svg">> = (props) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
);

export const Option = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: OptionProps<Option, IsMulti, Group>
) => {
  const {
    className,
    cx,
    innerRef,
    innerProps,
    children,
    isFocused,
    isDisabled,
    isSelected,
    selectProps: {
      chakraStyles,
      size: sizeProp,
      isMulti,
      hideSelectedOptions,
      selectedOptionStyle,
      selectedOptionColorPalette,
    },
  } = props;

  const menuRecipe = useSlotRecipe({ key: "menu" });
  const menuItemStyles = menuRecipe({}).item;


  const size = useSize(sizeProp);
  const horizontalPaddingOptions: SizeProps = {
    sm: "0.6rem",
    md: "0.8rem",
    lg: "1rem",
  };
  const verticalPaddingOptions: SizeProps = {
    sm: "0.3rem",
    md: "0.4rem",
    lg: "0.5rem",
  };

  // Don't create exta space for the checkmark if using a multi select with
  // options that dissapear when they're selected
  const showCheckIcon =
    selectedOptionStyle === "check" &&
    (!isMulti || hideSelectedOptions === false);

  const shouldHighlight = selectedOptionStyle === "color";

  const initialCss: SystemStyleObject = {
    ...menuItemStyles,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    width: "100%",
    textAlign: "start",
    fontSize: size,
    paddingX: horizontalPaddingOptions[size],
    paddingY: verticalPaddingOptions[size],
    ...(shouldHighlight && {
      _selected: {
        bg: 'bg',
        color: 'colorPalette.400',
        _active: { bg: 'bg.emphasized' },
      },
    }),
  };

  const css = chakraStyles?.option
    ? chakraStyles.option(initialCss, props)
    : initialCss;
  return (
    <Box
      {...innerProps}
      className={cx(
        {
          option: true,
          "option--is-disabled": isDisabled,
          "option--is-focused": isFocused,
          "option--is-selected": isSelected,
        },
        className
      )}
      css={css}
      ref={innerRef}
      data-focus={isFocused ? true : undefined}
      aria-disabled={isDisabled ? true : undefined}
      aria-selected={isSelected}
    >
      {showCheckIcon && (
        <Icon
          fontSize="0.8em"
          marginEnd="0.75rem"
          opacity={isSelected ? 1 : 0}
        >
          <CheckIcon />
        </Icon>
      )}
      {children}
    </Box>
  );
};
