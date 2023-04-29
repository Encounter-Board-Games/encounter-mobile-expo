import React from 'react';
import { withTheme, ThemeProps } from 'styled-components';
import { H3 } from '../../../components/Typography';
import CheckButton from '../../../components/CheckButton';
import RadioButton from '../../../components/RadioButton';
// eslint-disable-next-line max-len
import { handleSetSelectFilter } from '../../../store/actions/filters/handleSetFilters';
import { useDispatch } from 'react-redux';
import { openInfoModal } from '../../../store/actions/info';
import Icons from '../../../components/IconsComponent';
import {
  Header,
  StackHeaderInterpolatedStyle,
  StackHeaderInterpolationProps,
} from '@react-navigation/stack';
import { Space } from '../SearchStyles';
import { Icon, Tags, Hr } from './FilterItemStyles';

interface FilterItemProps extends ThemeProps<any> {
  title: string;
  info?: string;
  tags: string[];
  selects: string[];
  type: string;
  values?: string[];
  isSingle?: boolean;
}

const FilterItem = (props: FilterItemProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Space />
      <Space />
      <Header
        layout={{
          width: 0,
          height: 0,
        }}
        progress={{
          current: undefined,
          next: undefined,
          previous: undefined,
        }}
        options={undefined}
        route={undefined}
        navigation={undefined}
        styleInterpolator={function (
          props: StackHeaderInterpolationProps
        ): StackHeaderInterpolatedStyle {
          throw new Error('Function not implemented.');
        }}
      >
        {props.title !== '' && (
          <H3 color={props.theme.colors.secondDarkColor}>{props.title}</H3>
        )}

        {props.info && (
          <Icon
            onPress={() => dispatch(openInfoModal(props.info, props.title))}
          >
            <Icons
              name={'exclamation'}
              color={props.theme.colors.darkColor}
              size={16}
            />
          </Icon>
        )}
      </Header>
      <Space />
      <Tags>
        {props.tags.map((e, key) =>
          !props.isSingle ? (
            <CheckButton
              isSelected={props.selects.includes(e)}
              key={key}
              onPress={() => dispatch(handleSetSelectFilter(props.type, e))}
            >
              {props.values ? props.values[key] : e}
            </CheckButton>
          ) : (
            <RadioButton
              isLast={key === props.tags.length - 1}
              isFlex={props.tags.length === 2}
              isSelected={props.selects.includes(e)}
              key={key}
              onPress={() => dispatch(handleSetSelectFilter(props.type, e))}
            >
              {props.values ? props.values[key] : e}
            </RadioButton>
          )
        )}
      </Tags>
      <Hr />
    </>
  );
};

export default withTheme(FilterItem);
