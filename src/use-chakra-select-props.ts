import type {ColorPalette} from "@chakra-ui/react";
import { useChakraContext, useFieldContext,} from "@chakra-ui/react";
import type { GroupBase, Props } from "react-select";
import chakraComponents from "./chakra-components";
import type { SelectedOptionStyle } from "./types";

const useChakraSelectProps = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  components = {},
  // eslint-disable-next-line deprecation/deprecation
  theme,
  size,
  colorPalette = "gray",
  isDisabled,
  isInvalid,
  isReadOnly,
  required,
  isRequired,
  inputId,
  tagVariant,
  selectedOptionStyle = "color",
  selectedOptionColorPalette,
  variant,
  focusBorderColor,
  errorBorderColor,
  chakraStyles = {},
  onFocus,
  onBlur,
  menuIsOpen,
  ...props
}: Props<Option, IsMulti, Group>): Props<Option, IsMulti, Group> => {
  const chakraContext = useChakraContext();
  const { variant: defaultVariant } = chakraContext.getRecipe('input').defaultVariants;

  // Combine the props passed into the component with the props that can be set
  // on a surrounding form control to get the values of `isDisabled` and
  // `isInvalid`
  const inputProps = useFieldContext().getInputProps();

  // Unless `menuIsOpen` is controlled, disable it if the select is readonly
  const realMenuIsOpen =
    menuIsOpen ?? (inputProps.readOnly ? false : undefined);

  // Ensure that the selected option style is either `color` or `check`
  let realSelectedOptionStyle: SelectedOptionStyle = selectedOptionStyle;
  const selectedOptionStyleOptions: SelectedOptionStyle[] = ["color", "check"];
  if (!selectedOptionStyleOptions.includes(selectedOptionStyle)) {
    realSelectedOptionStyle = "color";
  }

  // Ensure that the color used for the selected options is a string
  let realSelectedOptionColorScheme: ColorPalette =
    selectedOptionColorPalette || "blue";
  if (typeof realSelectedOptionColorScheme !== "string") {
    realSelectedOptionColorScheme = "blue";
  }

  const select: Props<Option, IsMulti, Group> = {
    // Allow overriding of custom components
    components: {
      ...chakraComponents,
      ...components,
    },
    // Custom select props
    colorPalette,
    size,
    tagVariant,
    selectedOptionStyle: realSelectedOptionStyle,
    selectedOptionColorPalette: realSelectedOptionColorScheme,
    variant: variant ?? defaultVariant,
    chakraStyles,
    focusBorderColor,
    errorBorderColor,
    // Extract custom props from form control
    onFocus: inputProps.onFocus,
    onBlur: inputProps.onBlur,
    isDisabled: inputProps.disabled,
    isInvalid: !!inputProps["aria-invalid"],
    inputId: inputProps.id,
    isReadOnly: inputProps.readOnly,
    required: required ?? inputProps.required,
    menuIsOpen: realMenuIsOpen,
    ...props,
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    "aria-invalid": props["aria-invalid"] ?? inputProps["aria-invalid"],
  };

  return select;
};

export default useChakraSelectProps;
