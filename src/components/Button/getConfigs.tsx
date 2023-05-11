/* eslint-disable prettier/prettier */
/* eslint-disable indent */
export default function getConfigs(theme: any, type: string) {
  switch (type) {
    case "CallToAction":
    case "CallToAction-Orange":
      return {
        textColorIsOutline: theme.colors.light,
        textColor: theme.colors.light,
        background:
          type === "CallToAction" ? theme.colors.dark : theme.colors.warming,
        borderColor:
          type === "CallToAction" ? theme.colors.dark : theme.colors.warming,
        width: "100%",
        paddingSides: theme.space.s3,
        fontSize: theme.sizes.h2,
      };
    case "CallToAction-Small":
    case "CallToAction-Orange-Small":
      return {
        textColorIsOutline: theme.colors.light,
        textColor: theme.colors.light,
        background:
          type === "CallToAction-Small"
            ? theme.colors.dark
            : theme.colors.warming,
        borderColor:
          type === "CallToAction-Small"
            ? theme.colors.dark
            : theme.colors.warming,
        width: "auto",
        paddingSides: theme.space.s1,
        fontSize: theme.sizes.subtitle2,
      };
    case "CallToAction-Light":
    case "CallToAction-Light-Small":
    case "CallToAction-Light-Small2":
      return {
        textColorIsOutline: theme.colors.light,
        textColor: theme.colors.light,
        background: theme.colors.primaryDark,
        borderColor: theme.colors.primaryDark,
        width: "100%",
        paddingSides: theme.space.s3,
        fontSize:
          type === "CallToAction-Light"
            ? theme.sizes.h2
            : theme.sizes.subtitle1,
      };
    case "CallToAction-Outline":
      return {
        isOutline: true,
        textColorIsOutline: theme.colors.seconddark,
        textColor: theme.colors.seconddark,
        background: theme.colors.light,
        borderColor: theme.colors.secondColor,
        width: "auto",
        paddingSides: theme.space.s3,
        fontSize: theme.sizes.subtitle1,
      };
    case "CallToAction-Outline-Flex":
      return {
        isOutline: true,
        textColorIsOutline: theme.colors.seconddark,
        textColor: theme.colors.seconddark,
        background: theme.colors.secondColor,
        borderColor: theme.colors.secondColor,
        width: "100%",
        paddingSides: theme.space.s3,
        fontSize: theme.sizes.subtitle1,
      };
    case "ComplementButton":
      return {
        textColorIsOutline: theme.colors.light,
        textColor: theme.colors.light,
        background: theme.colors.complement,
        borderColor: theme.colors.complement,
        paddingSides: theme.space.s1,
        fontSize: theme.sizes.subtitle2,
      };
    case "CallToAction-Primary-Color":
      return {
        textColorIsOutline: theme.colors.light,
        textColor: theme.colors.light,
        background: theme.colors.primaryDark,
        borderColor: theme.colors.primaryDark,
        paddingSides: theme.space.s1,
        fontSize: theme.sizes.subtitle1,
      };
    case "ComplementButton-Medium":
    case "ComplementButton-Big":
    case "ComplementButton-Orange-Big":
      return {
        textColorIsOutline: theme.colors.light,
        textColor: theme.colors.light,
        background:
          type === "ComplementButton-Medium"
            ? theme.colors.complement
            : type === "ComplementButton-Big"
            ? theme.colors.complement
            : theme.colors.warming,
        borderColor:
          type === "ComplementButton-Medium"
            ? theme.colors.complement
            : type === "ComplementButton-Big"
            ? theme.colors.complement
            : theme.colors.warming,
        width: type === "ComplementButton-Big" ? "auto" : "100%",
        paddingSides: theme.space.s3,
        fontSize: theme.sizes.subtitle1,
      };
    default:
      return {};
  }
}
