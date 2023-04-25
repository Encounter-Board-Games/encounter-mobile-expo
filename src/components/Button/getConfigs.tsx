/* eslint-disable prettier/prettier */
/* eslint-disable indent */
export default function getConfigs(theme: any, type: string) {
  switch (type) {
    case 'CallToAction':
    case 'CallToAction-Orange':
      return {
        textColorIsOutline: theme.colors.lightColor,
        textColor: theme.colors.lightColor,
        background:
          type === 'CallToAction'
            ? theme.colors.darkColor
            : theme.colors.warming,
        borderColor:
          type === 'CallToAction'
            ? theme.colors.darkColor
            : theme.colors.warming,
        width: '100%',
        paddingSides: theme.space.space3,
        fontSize: theme.sizes.h2,
      };
    case 'CallToAction-Small':
    case 'CallToAction-Orange-Small':
      return {
        textColorIsOutline: theme.colors.lightColor,
        textColor: theme.colors.lightColor,
        background:
          type === 'CallToAction-Small'
            ? theme.colors.darkColor
            : theme.colors.warming,
        borderColor:
          type === 'CallToAction-Small'
            ? theme.colors.darkColor
            : theme.colors.warming,
        width: 'auto',
        paddingSides: theme.space.space1,
        fontSize: theme.sizes.subtitle2,
      };
    case 'CallToAction-Light':
    case 'CallToAction-Light-Small':
    case 'CallToAction-Light-Small2':
      return {
        textColorIsOutline: theme.colors.lightColor,
        textColor: theme.colors.lightColor,
        background: theme.colors.primaryDarkColor,
        borderColor: theme.colors.primaryDarkColor,
        width: '100%',
        paddingSides: theme.space.space3,
        fontSize:
          type === 'CallToAction-Light'
            ? theme.sizes.h2
            : theme.sizes.subtitle1,
      };
    case 'CallToAction-Outline':
      return {
        isOutline: true,
        textColorIsOutline: theme.colors.secondDarkColor,
        textColor: theme.colors.secondDarkColor,
        background: theme.colors.lightColor,
        borderColor: theme.colors.secondColor,
        width: 'auto',
        paddingSides: theme.space.space3,
        fontSize: theme.sizes.subtitle1,
      };
    case 'CallToAction-Outline-Flex':
      return {
        isOutline: true,
        textColorIsOutline: theme.colors.secondDarkColor,
        textColor: theme.colors.secondDarkColor,
        background: theme.colors.secondColor,
        borderColor: theme.colors.secondColor,
        width: '100%',
        paddingSides: theme.space.space3,
        fontSize: theme.sizes.subtitle1,
      };
    case 'ComplementButton':
      return {
        textColorIsOutline: theme.colors.lightColor,
        textColor: theme.colors.lightColor,
        background: theme.colors.complementColor,
        borderColor: theme.colors.complementColor,
        paddingSides: theme.space.space1,
        fontSize: theme.sizes.subtitle2,
      };
    case 'CallToAction-Primary-Color':
      return {
        textColorIsOutline: theme.colors.lightColor,
        textColor: theme.colors.lightColor,
        background: theme.colors.primaryDarkColor,
        borderColor: theme.colors.primaryDarkColor,
        paddingSides: theme.space.space1,
        fontSize: theme.sizes.subtitle1,
      };
    case 'ComplementButton-Medium':
    case 'ComplementButton-Big':
    case 'ComplementButton-Orange-Big':
      return {
        textColorIsOutline: theme.colors.lightColor,
        textColor: theme.colors.lightColor,
        background:
          type === 'ComplementButton-Medium'
            ? theme.colors.complementColor
            : type === 'ComplementButton-Big'
              ? theme.colors.complementColor
              : theme.colors.warming,
        borderColor:
          type === 'ComplementButton-Medium'
            ? theme.colors.complementColor
            : type === 'ComplementButton-Big'
              ? theme.colors.complementColor
              : theme.colors.warming,
        width: type === 'ComplementButton-Big' ? 'auto' : '100%',
        paddingSides: theme.space.space3,
        fontSize: theme.sizes.subtitle1,
      };
    default:
      return {};
  }
}
