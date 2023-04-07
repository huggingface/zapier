const perform = async (z, bundle) => {
  fetch = z.require('node-fetch');
  fs = z.require('fs');

  // const data = fs.readFileSync(bundle.inputData.image).toString("base64");
  const image = await fetch(bundle.inputData.image)
    .then((res) => res.arrayBuffer())
    .then((buffer) => Buffer.from(buffer).toString('base64'));
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
      question: bundle.inputData.question,
      image: image,
    }),
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results[0];
  });
};

module.exports = {
  operation: {
    inputFields: [
      {
        key: 'image',
        label: 'image',
        type: 'string',
        helpText:
          'URL to an image of a document that you want to ask a question about.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'question',
        label: 'question',
        type: 'string',
        helpText: 'The question to ask about the provided image',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'repo_id',
        label: 'repo_id',
        type: 'string',
        default: 'impira/layoutlm-document-qa',
        helpText: 'The repository identifier from huggingface',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: { score: 0.43142279982566833, answer: '12210', start: 10, end: 10 },
    outputFields: [
      { key: 'score', label: 'Score', type: 'text' },
      { key: 'answer', label: 'Answer', type: 'text' },
      { key: 'start', label: 'Start Token', type: 'integer' },
      { key: 'end', label: 'End Token', type: 'integer' },
    ],
    perform: perform,
  },
  key: 'docqa',
  noun: 'answer',
  display: {
    label: 'Document Question Answering',
    description:
      'Use a compatible model from the Hugging Face Hub to get an answer from an image of a document.',
    hidden: false,
    important: true,
  },
};
