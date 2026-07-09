import Keycloak from 'keycloak-js';
import { CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL } from 'src/constants/keycloak.constants';

const keycloak = new Keycloak({
  url: KEYCLOAK_URL,
  realm: KEYCLOAK_REALM,
  clientId: CLIENT_ID,
});

export default keycloak;
