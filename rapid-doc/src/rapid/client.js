import rapid from 'rapid-io';

import MockClient from './MockClient';

const shouldMock = window.location.search.match('mock=true');

const client = shouldMock
  ? MockClient.createClient()
  : rapid.createClient('NDA1OWE0MWo1b3AzYmVrLnJhcGlkLmlv');

export default client;
