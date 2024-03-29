import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon, { Icons } from '../components/icons/Icons';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../assets/colors';
import { Home, Suggestion, GroupEachProduct, ProfileScreen } from '../screens';
import {Forum} from "../screens/forum/Forum.tsx";
import { UserGroup } from '../screens/groups/UserGroup';
import {Notifications} from "../screens/notifications";

interface TabItem {
  route: string;
  label: string;
  // @ts-ignore
  type: Icons;
  icon: string;
  component: React.ComponentType<any>;
}

const TabArr: TabItem[] = [
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: Home },
  { route: 'Forum', label: 'Forum', type: Icons.MaterialCommunityIcons, icon: 'post-outline', component: Forum },
  { route: 'Group', label: 'Group', type: Icons.MaterialCommunityIcons, icon: 'select-group', component: UserGroup },
  { route: 'Notifications', label: 'Notifications', type: Icons.Ionicons, icon: 'notifications', component: Notifications },
  { route: 'Profile', label: 'Profile', type: Icons.FontAwesome, icon: 'user-circle-o', component: ProfileScreen },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: 0.5, translateY: 2 }, 0.92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } };
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 2 } };

interface TabButtonProps {
  item: TabItem;
  onPress: () => void;
  accessibilityState: { selected: boolean };
}

const TabButton: React.FC<TabButtonProps> = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<Animatable.View>(null);
  const textRef = useRef<Animatable.Text>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(animate1);
    } else {
      viewRef.current?.animate(animate2);
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View style={focused ? styles.circlePress : styles.circleBeforePress} />
          <Icon type={item.type}  name={item.icon} color={focused ? Colors.secondaryColor : Colors.primaryColor} />
        </View>
        <Animatable.Text ref={textRef} style={focused ? styles.textFocused : styles.textBeforeFocus}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true
      }}
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: true,
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 0,
    right: 10,
    left: 10,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.secondaryColor,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBeforePress: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor,
    borderRadius: 25,
  },
  circlePress: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: 25,
  },
  textBeforeFocus: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
  textFocused: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.primaryColor,
  }
});

export {BottomTabs}