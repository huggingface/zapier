const perform = async (z, bundle) => {
  const url =
    'https://api-inference.huggingface.co/models/' + bundle.inputData.repo_id;
  const options = {
    url: url,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Wait-For-Model': true,
      Authorization: `Bearer ${bundle.authData.key}`,
    },
    body: JSON.stringify({
      inputs: bundle.inputData.text,
    }),
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    return { data: results[0]['translation_text'] };
  });
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
    sample: { data: 'Me llamo Carl y soy ingeniero.' },
    outputFields: [{ key: 'data', label: 'Translated Text', type: 'text' }],
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
