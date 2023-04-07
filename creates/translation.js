const perform = async (z, bundle) => {
  const { HfInference } = z.require('@huggingface/inference');
  const hf = new HfInference(bundle.authData.key);
  const result = await hf.translation({
    model: bundle.inputData.repo_id,
    inputs: bundle.inputData.text
  })
  return result
};

module.exports = {
  operation: {
    inputFields: [
      {
        key: 'text',
        label: 'Text',
        type: 'text',
        helpText: 'Text you want to translate from one language to another',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'repo_id',
        label: 'Repo ID',
        type: 'string',
        helpText:
          'The Repo ID of the model on the Hub you want to use for translation. (Ex `Helsinki-NLP/opus-mt-en-es`)',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: { translation_text: 'Me llamo Carl y soy ingeniero.' },
    outputFields: [{ key: 'translation_text', label: 'Translation Text', type: 'text' }],
  },
  key: 'translation',
  noun: 'Translation',
  display: {
    label: 'Language Translation',
    description:
      'Use a compatible model from the Hugging Face Hub to translate text from one language to another.',
    hidden: false,
    important: true,
  },
};
