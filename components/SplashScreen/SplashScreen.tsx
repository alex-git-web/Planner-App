import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../../colors";
import ButtonsButtom from "./components/screen_section/buttons_buttom/ButtonsButtom";
import CaptionMiddle from "./components/screen_section/caption_middle/CaptionMiddle";
import ImageTop from "./components/screen_section/image_top/ImageTop";
import ScreenIndicator from "./components/screen_section/screen_indicator/ScreenIndicator";

interface PageProps {
    
}

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const animation_duration = 500

const SplashScreen: React.FC<PageProps> = () => {
    const [idScreen, setIdScreen] = useState<number>(0)

    return (
        <View style={styles.container}>
            <ImageTop idScreen={idScreen} animation_duration={animation_duration} />
            <CaptionMiddle idScreen={idScreen} animation_duration={animation_duration} />
            <ScreenIndicator idScreen={idScreen} animation_duration={animation_duration} />
            <ButtonsButtom idScreen={idScreen} setIdScreen={setIdScreen} animation_duration={animation_duration} />
        </View>
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