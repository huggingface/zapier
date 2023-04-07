const authentication = require('./authentication');
const docqaCreate = require('./creates/docqa.js');
const textClassificationCreate = require('./creates/text_classification.js');
const translationCreate = require('./creates/translation.js');
const textGenerationCreate = require('./creates/text_generation.js');
const summarizationCreate = require('./creates/summarization.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  triggers: {},
  creates: {
    [docqaCreate.key]: docqaCreate,
    [textClassificationCreate.key]: textClassificationCreate,
    [translationCreate.key]: translationCreate,
    [textGenerationCreate.key]: textGenerationCreate,
    [summarizationCreate.key]: summarizationCreate,
  },
};
