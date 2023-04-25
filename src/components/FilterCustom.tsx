import React, { useState } from 'react';
import { withTheme, DefaultTheme } from 'styled-components/native';
import { Space, Bottom } from './Space';
import { H4, H3 } from './Typography';
import { Image, View, TouchableOpacity, ScrollView } from 'react-native';
import Button from './Button/Button';
import Carrossel from './Carrossel';
import { useDispatch, useSelector } from 'react-redux';
import { openInfoModal } from '../store/actions/info';
import CheckButton from './CheckButton';
import { handleSelectFilterToggle } from '../store/actions/shared';
import OptionWithImage from './OptionWithImage';
import Icons from './Icons';
import {
  MainContainer,
  Container,
  Content,
  ImageContent,
  ImageContent2,
  MoreInfo,
  Tags,
  Footer,
} from './FilterCustomStyles';
import { ButtonComponent } from './Button/ButtonStyles';

export interface FilterItemProps {
  type: string;
  image?: string;
  selects: string[];
  full?: boolean;
}

const FilterItem: React.FC<FilterItemProps & { theme: DefaultTheme }> = ({
  type,
  image,
  selects,
  theme,
  full = false,
}) => {
  const filters = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();
  if (!filters || !filters.length) return <Container />;

  const filter = filters.find((f) => f.type === type);
  const tagsValues = filter.options;
  const tags = filter.values || filter.options;

  return (
    <View flex={1}>
      <Tags>
        {tags.map((e, key) => (
          <CheckButton
            isSelected={selects.includes(tagsValues[key])}
            key={key}
            onPress={() =>
              dispatch(handleSelectFilterToggle(type, tagsValues[key]))
            }
          >
            {e}
          </CheckButton>
        ))}
      </Tags>
      {filter.info && (
        <View style={{ position: 'relative', zIndex: 99 }}>
          <MoreInfo>
            <Space n={3} />
            <TouchableOpacity
              onPress={() => dispatch(openInfoModal(filter.info, filter.title))}
              style={{
                width: 32,
                height: 32,
              }}
            >
              <Icons
                name={'exclamation'}
                color={theme.colors.darkColor}
                size={theme.sizes.icons}
              />
            </TouchableOpacity>
          </MoreInfo>
        </View>
      )}
      {image && (
        <ImageContent2 full={full}>
          <ImageContent full={full}>
            <Image
              resizeMode={'contain'}
              style={{ height: '100%', width: '100%', maxWidth: '100%' }}
              source={{ uri: image }}
            />
          </ImageContent>
        </ImageContent2>
      )}
    </View>
  );
};

interface QuestionProps {
  full?: boolean;
  title: string;
  options: {
    label: string;
    values: string[];
    image?: string;
  }[];
  type: string;
  optionsType: string;
  image?: string;
  selectsState: Record<string, string[]>;
}

const Question: React.FC<QuestionProps & { theme: DefaultTheme }> = ({
  full = false,
  title,
  options,
  type,
  optionsType,
  image,
  selectsState,
  theme,
}) => {
  const selects = selectsState[type] || [];

  const isSelected = (values: string[]) => {
    let checker: number[] = [];

    selects
      .flat()
      .forEach((select) => values.includes(select) && checker.push(1));
    return checker.length >= values.length;
  };

  const formatData = (title: string) => {
    return title.split('\n').map((t, i) => (
      <View key={i}>
        {i > 0 && <Space n={1} />}
        <H4>
          {t
            .split('*')
            .map((text, index) =>
              index % 2 === 0 ? (
                <H4 key={index}>{text}</H4>
              ) : (
                <H3 key={index}>{text}</H3>
              )
            )}
        </H4>
      </View>
    ));
  };

  const dispatch = useDispatch();

  return (
    <Content>
      <Space n={3} />
      {formatData(title)}
      <Space n={2} />
      {optionsType === 'imageChoice' ? (
        options.map((option, key) => (
          <OptionWithImage
            key={key}
            label={option.label}
            values={option.values}
            image={option.image}
            isActive={isSelected(option.values)}
            onPress={() =>
              dispatch(handleSelectFilterToggle(type, option.values))
            }
          />
        ))
      ) : (
        <FilterItem
          full={full}
          image={image}
          selects={selects}
          type={type}
          theme={undefined}
        />
      )}
    </Content>
  );
};

interface StepProps {
  onNext: () => void;
  steps: {
    type: string;
    title: string;
    optionsType: string;
    options?: {
      label: string;
      values: string[];
      image?: string;
    }[];
    image?: string;
    steps?: StepProps['steps'];
  }[];
  selectsState: Record<string, string[]>;
}

const Step: React.FC<StepProps & { theme: DefaultTheme }> = ({
  onNext,
  steps,
  selectsState,
  theme,
}) => {
  const hasSelects = steps
    .map(
      (step) => selectsState[step.type] && selectsState[step.type].length > 0
    )
    .reduce((a, b) => a && b, true);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {steps.map((step, index) => (
          <Question
            full={steps.length === 1}
            selectsState={selectsState}
            key={index}
            {...step}
          />
        ))}
        <Footer>
          <Space n={2} />
          <ButtonComponent
            disabled={!hasSelects}
            type="CallToAction-Light"
            width={'100%'}
            onPress={() => onNext()}
          >
            Continuar
          </ButtonComponent>
        </Footer>
        <Bottom />
      </ScrollView>
    </Container>
  );
};

interface FilterProps {
  onNext: () => void;
  steps: {
    type: string;
    title: string;
    optionsType: string;
    options?: {
      label: string;
      values: string[];
      image?: string;
    }[];
    image?: string;
    steps?: StepProps['steps'];
  }[];
  selectsState: Record<string, string[]>;
  onBack: () => void;
}

const Filter: React.FC<FilterProps & { theme: DefaultTheme }> = ({
  theme,
  onNext,
  steps,
  selectsState,
  onBack,
}) => {
  const [stepsEnable, setStepsEnable] = useState(1);
  const [current, setCurrent] = useState(0);

  const _onNext = (n: number) => {
    if (n + 1 === steps.length) {
      onNext();
      return;
    }
    setCurrent(n + 1);
    if (stepsEnable < n + 2) setStepsEnable(n + 2);
  };

  const back = () => {
    if (current === 0) onBack();
    else setCurrent(current - 1);
  };

  return (
    <MainContainer>
      <Carrossel
        stepperUp
        paddingRight={theme.space.space3}
        enablePages={stepsEnable}
        current={current}
        noMargin
        blocked
        onBack={back}
        onCurrentChange={(n) => setCurrent(n)}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            steps={step.steps || []}
            selectsState={selectsState}
            onNext={() => _onNext(index)}
            theme={theme}
          />
        ))}
      </Carrossel>
    </MainContainer>
  );
};

export default withTheme(Filter);
