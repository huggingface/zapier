const authentication = require('./authentication');
const automaticSpeechRecognitionCreate = require('./creates/automatic_speech_recognition.js');
const docqaCreate = require('./creates/docqa.js');
const textClassificationCreate = require('./creates/text_classification.js');
const translationCreate = require('./creates/translation.js');
const textGenerationCreate = require('./creates/text_generation.js');
const summarizationCreate = require('./creates/summarization.js');
const questionAnsweringCreate = require('./creates/question_answering.js');
const zeroShotClassificationCreate = require('./creates/zero_shot_classification.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  triggers: {},
  creates: {
    [automaticSpeechRecognitionCreate.key]: automaticSpeechRecognitionCreate,
    [docqaCreate.key]: docqaCreate,
    [textClassificationCreate.key]: textClassificationCreate,
    [translationCreate.key]: translationCreate,
    [textGenerationCreate.key]: textGenerationCreate,
    [summarizationCreate.key]: summarizationCreate,
    [questionAnsweringCreate.key]: questionAnsweringCreate,
    [zeroShotClassificationCreate.key]: zeroShotClassificationCreate,
  },
};
