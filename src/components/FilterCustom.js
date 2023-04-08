import React, { useState } from 'react'
import { withTheme } from 'styled-components'
import { Space, Bottom } from './Space'
import { H4, H3 } from './Typography'
import { Image, View } from 'react-native'
import { Button } from './Button'
import Carrossel from './Carrossel'
import { useDispatch, useSelector } from 'react-redux'
import { openInfoModal } from '../store/actions/info'
import { CheckButton } from './CheckButton'
import { handleSelectFilterToggle } from '../store/actions/shared'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import OptionWithImage from './OptionWithImage'
import Icons from './Icons'
import {MainContainer, Container, Content, ImageContent, ImageContent2, MoreInfo, Footer, Tags } from './FilterCustomStyles'

const FilterItem = withTheme(({ type, image, selects, theme, full }) => {

    const filters = useSelector(state => state.filters.filters)
    const dispatch = useDispatch();
    if (!filters || !filters.length) return <Container></Container>

    const filter = filters.find(f => f.type == type)
    const tagsValues = filter.options
    const tags = filter.values || filter.options

    
    return (<View flex={1}>

        <Tags>
            {
                tags.map((e, key) => (
                    <CheckButton
                        isSelected={selects.includes(tagsValues[key])}
                        key={key}
                        onPress={() => dispatch(handleSelectFilterToggle(type, tagsValues[key] ))}
                    >{e}
                    </CheckButton>))
            }
        </Tags>
        {
            filter.info && <View style={{ position: 'relative', zIndex: 99 }}>
                <MoreInfo>
                   
                    <TouchableOpacity onPress={() => dispatch(openInfoModal(filter.info, filter.title))}
                        style={{
                            width: 32,
                            height: 32,
                        }}>
                        <Icons name={"exclamation"} color= '#414042' size={theme.sizes.icons} />

                    </TouchableOpacity>

                </MoreInfo>
            </View>
        }
        {
            (image) && <ImageContent2 full={full}>
                <ImageContent full={full}>
                    <Image resizeMode={"contain"} style={{ height: '100%', width: "100%", maxWidth: '100%' }} source={{ uri: image }} />
                </ImageContent>
            </ImageContent2>

        }

    </View>)
})


const Question = ({ full, title, options, type, optionsType, image, selectsState }) => {
    
    const selects = selectsState[type] || [];

    const isSelected = (values) => {
        let checker = [];

        selects.flat().forEach(select => values.includes(select) && checker.push(1));

        return checker.length >= values.length;
    };

    const formatData = (title) => {
        return title.split('\\n').map((t, i) => (
            <View key={i}>
                {i > 0}
                <H4>
                    {t.split('*').map((text, index) =>
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
           
            {formatData(title)}
           

            {
                optionsType === "imageChoice" ?
                    options.map((option, key) => <OptionWithImage
                        key={key}
                        {...option}
                        isActive={isSelected(option.values)}
                        onPress={() => dispatch(handleSelectFilterToggle(type, option.values))}
                    />)
                    : <FilterItem full={full} image={image} selects={selects} type={type} />
            }
        </Content>
    );
};


const Step = ({ onNext, steps, selectsState }) => {

    const hasSelects = steps
      .map(step => selectsState[step.type] && selectsState[step.type].length > 0)
      .reduce((a, b) => a && b, true);
  
    return (
      <Container>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {steps.map((step, index) => (<Question full={steps.length == 1} selectsState={selectsState} key={index} {...step} />))}
          <Footer>
           
            <Button disabled={!hasSelects} type="CallToAction-Light" width={"100%"} onPress={() => onNext()}>Continuar</Button>
          </Footer>
          <Bottom />
        </ScrollView>
      </Container>
    );
  }
  

export default withTheme(({ theme, onNext, steps, selectsState, onBack }) => {

    const [stepsEnable, setStepsEnable] = useState(1);
    const [current, setCurrent] = useState(0);
    const _onNext = (n) => {

        if (n + 1 == steps.length) {
            onNext();
            return;
        }
        setCurrent(n + 1);
        if (stepsEnable < n + 2)
            setStepsEnable(n + 2)
    }
    const back = () => {
        if (current == 0)
            onBack();
        else
            setCurrent(current - 1);
    }

    return (<MainContainer>

        <Carrossel stepperUp

            paddingRight={'24px'}
            enablePages={stepsEnable}
            current={current}
            noMargin
            blocked
            onBack={back}
            onCurrentChange={(n) => setCurrent(n)} >
            {
                steps.map((step, index) => <Step
                    key={index}
                    steps={step.steps}
                    selectsState={selectsState}
                    onNext={() => _onNext(index)}
                />)
            }

        </Carrossel>
    </MainContainer>)
})