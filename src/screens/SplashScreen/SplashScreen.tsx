import React, { useState } from "react";
import { Dimensions, StyleSheet, View, SafeAreaView } from "react-native";
import { colors } from "../../../colors";
import { animation_duration } from "../../common/constants";
import ButtonsButtom from "./components/screen_sections/buttons_buttom/ButtonsButtom";
import CaptionMiddle from "./components/screen_sections/caption_middle/CaptionMiddle";
import ImageTop from "./components/screen_sections/image_top/ImageTop";
import ScreenIndicator from "./components/screen_sections/screen_indicator/ScreenIndicator";

interface PageProps {}

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const SplashScreen: React.FC<PageProps> = () => {
    const [idScreen, setIdScreen] = useState<number>(0)

    const {splash_screen_elements:a_duration} = animation_duration

    return (
      <SafeAreaView style={{width: PAGE_WIDTH, height: PAGE_HEIGHT}}>
        <View style={styles.container}>
            <ImageTop idScreen={idScreen} animation_duration={a_duration} />
            <CaptionMiddle idScreen={idScreen} animation_duration={a_duration} />
            <ScreenIndicator idScreen={idScreen} animation_duration={a_duration} />
            <ButtonsButtom idScreen={idScreen} setIdScreen={setIdScreen} animation_duration={a_duration} />
        </View>
      </SafeAreaView> 
    );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: '5%',
    backgroundColor: colors.white
  },
 
});

export default SplashScreen;