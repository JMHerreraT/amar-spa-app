import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerProgress,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { useTheme } from "styled-components/native";
import Animated from "react-native-reanimated";

import { McText, McImage } from "Components";
import { Images } from "Constants";
import { Home, Profile, Services, Settings } from "Screens";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MenuOptions } from "Mock";


const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, theme }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View
     style={{ 
      flex: 1,
    }}
      >
      {/*Header START */}
      <View
        style={{
          width: 210,
          height: 107,
          borderBottomEndRadius: 107 / 2,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.colors.boxBackground,
              marginRight: 10,
              alignItems: "center",
            }}
          >
            <McImage
              style={{
                width: 40,
                height: 40,
              }}
              source={Images.profile}
            />
          </View>
          <View>
            <McText semi size={16} color={theme.colors.text1}>
              Carol Black
            </McText>
            <McText medium size={10} color={theme.colors.text2}>
              Seattle, Washington
            </McText>
          </View>
        </View>
      </View>
      {/* Header END */}

      {/* DrawerItems START */}
      <DrawerContentScrollView
        scrollEnabled={false}
        contentContainerStyle={{}}
        style={{ marginLeft: -18 }}
      >
        {MenuOptions?.map((option, index) => {
          return (
            <DrawerItem
              activeTintColor={theme.colors.boxBackground}
              key={index}
              focused={activeIndex === index}
              onPress={() => {
                navigation.navigate(option.name);
                setActiveIndex(index);
              }}
              label={({ focused }) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 4,
                        height: 33,
                        marginRight: 26,
                        backgroundColor: focused
                          ? theme.colors.primary
                          : "transparent",
                      }}
                    ></View>
                    <McText size={16} bold={focused} color={theme.colors.text1}>
                      {option.label}
                    </McText>
                  </View>
                );
              }}
            ></DrawerItem>
          );
        })}
      </DrawerContentScrollView>
      {/* DrawerItems END */}

      {/* Footer START */}
      <View
        style={{
          marginBottom: 27,
          marginLeft: 30,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          onPress={() => {
            // Simulates sign out and go to Sign in Screen
            navigation.closeDrawer();
            navigation.navigate('SignIn');
          }}
        >
          <McImage
            source={Images.log_out}
            style={{
              tintColor: theme.colors.text2,
              marginRight: 8,
            }}
          />
          <McText bold size={16} color={theme.colors.text2}>
            Cerrar Sesión
          </McText>
        </TouchableOpacity>
        <View style={{ marginTop: 62 }}>
          <McText medium size={10} color={theme.colors.text2}>
            Versión 1.0.0
          </McText>
        </View>
      </View>
      {/* Footer END */}
    </View>
  );
};

const DrawerScreenContainer = ({children}) => {
  const theme = useTheme();
  const progress = useDrawerProgress();
  const { value } = progress;
  const scale = Animated.interpolateNode(value, {
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  const rotate = Animated.interpolateNode(value, {
    inputRange: [0, 1],
    outputRange: ['0deg', '-10deg'],
  });

  const borderRadius = Animated.interpolateNode(value, {
    inputRange: [0, 1],
    outputRange: [1, 30],
  });

  const animatedStyle = {
    borderRadius,
    transform: [{ scale, 
      // rotateZ: rotate 
    }],
  };

  const isDrawerOpen = useDrawerStatus();

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
        overflow: 'hidden',
        ...animatedStyle
      }}>
      <StatusBar
        backgroundColor={isDrawerOpen == 'open' ? theme.colors.text1 : theme.colors.white}
        barStyle="dark-content"
      />
      {children}
    </Animated.View>
  )
}

const DrawerMenu = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.boxBackground,
      }}
    >
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          // drawerHideStatusBarOnOpen: true,
          drawerStyle: {
            flex: 1,
            width: "60%",
            backgroundColor: "transparent",
          },
          drawerType: "slide",
          overlayColor: "transparent",
          sceneContainerStyle: {
            backgroundColor: "transparent",
          },
          hideStatusBar: true,
        }}
        initialRouteName="Main"
        drawerContent={(props) => {
          return (
            <CustomDrawerContent navigation={props.navigation} theme={theme} />
          );
        }}
      > 
        <Drawer.Screen name="Main">
          {(props) => (
            <DrawerScreenContainer>
              <Home {...props}/>
            </DrawerScreenContainer>)}
        </Drawer.Screen>
        <Drawer.Screen name="Profile">
          {(props) => (
            <DrawerScreenContainer>
              <Profile {...props} />
            </DrawerScreenContainer>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Services">
          {(props) => (
            <DrawerScreenContainer>
              <Services {...props} />
            </DrawerScreenContainer>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Settings">
          {(props) => (
            <DrawerScreenContainer>
              <Settings {...props} />
            </DrawerScreenContainer>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerMenu;
