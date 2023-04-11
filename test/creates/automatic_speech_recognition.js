const expect = require('expect');
const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Create - automatic_speech_recognition', () => {
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
        file: "https://cdn-media.huggingface.co/speech_samples/sample1.flac",
        repo_id: 'openai/whisper-tiny.en',
      },
    };

    const result = await appTester(
      App.creates['automatic_speech_recognition'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
    result['text'].should.not.be.empty();
    expect(result['text']).toBe(" going along slushy country roads and speaking to damp audiences in drafty school rooms day after day for a fortnight. He'll have to put in an appearance at some place of worship on Sunday morning and he can come to us immediately afterwards.");
  });
});
