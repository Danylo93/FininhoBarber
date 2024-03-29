import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';


export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
  provider: boolean;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();
  const theme = useTheme();

  useEffect(() =>  {
   api.get('/providers').then(response => {
      
     
     const providers = response.data.filter(item => item.provider === true);
     setProviders(providers);
      console.log("Teste::",providers);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,{'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        


        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url ||
                  'https://github.com/DAnylo93.png'}} />
        </ProfileButton>

        <Icon name="log-out" size={14} color={theme.colors.orange} onPress={signOut} />
              
                
      </Header>

      <ProvidersList
        data={providers.length > 0 ? providers : []}
        keyExtractor={provider => provider.id}
        
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros:</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar
              source={{
                uri:
                  provider.avatar_url ||
                  'https://github.com/DAnylo93.png',
              }}
            />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color={theme.colors.orange} />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color={theme.colors.orange} />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
