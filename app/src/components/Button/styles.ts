import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.orange};
  border-radius: 10px;
  margin-top: 8px;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 10px;

`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.background};
  font-size: 18px;
`;
