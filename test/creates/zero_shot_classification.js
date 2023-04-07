require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - zero_shot_classification', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        key: process.env.KEY,
        oauth_consumer_key: process.env.OAUTH_CONSUMER_KEY,
        oauth_consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
        oauth_token: process.env.OAUTH_TOKEN,
        oauth_token_secret: process.env.OAUTH_TOKEN_SECRET,
      },
      inputData: {
        text: 'I love you',
        candidate_labels: "positive, negative",
        repo_id: 'facebook/bart-large-mnli',
      },
    };

    const result = await appTester(
      App.creates['zero_shot_classification'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
