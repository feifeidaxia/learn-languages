import React from 'react';
import { StatusBar } from 'react-native';
import { useThemeContext } from './ThemeProvider';

const ThemeAwareStatusBar: React.FC = () => {
  const { theme } = useThemeContext();
  
  return (
    <StatusBar 
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
      backgroundColor="transparent"
      translucent={true}
    />
  );
};

export default ThemeAwareStatusBar;