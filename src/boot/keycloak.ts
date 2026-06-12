import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://192.168.0.9:28080',
  realm: 'SAJ',
  clientId: 'saj-front',
});

export default keycloak;
