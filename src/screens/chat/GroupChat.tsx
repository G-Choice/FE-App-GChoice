import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';

const GroupChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#FA7189', 
          },
        }}
      />
      
      
    );
  };

  return (
    <>
      <HeaderNavigation type={'secondary'} title="" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Group Name</Text>
        </View>

        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 1, 
          }}
          renderBubble={renderBubble}
        />

        {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { GroupChatScreen };
