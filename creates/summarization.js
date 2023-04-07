const perform = async (z, bundle) => {
    const { HfInference } = z.require('@huggingface/inference');
    const hf = new HfInference(bundle.authData.key);
    const result = await hf.summarization({
      model: bundle.inputData.repo_id,
      inputs: bundle.inputData.text
      // TODO - add additional parameters (max_length, etc)
    })
    console.log(result)
    return result
  };
  
  module.exports = {
    operation: {
      inputFields: [
        {
          key: 'text',
          label: 'Text',
          type: 'text',
          helpText: 'The text you wish to summarize',
          required: true,
          list: false,
          altersDynamicFields: false,
        },
        {
          key: 'repo_id',
          label: 'Repo ID',
          type: 'string',
          helpText: 'The Repo ID for the model you wish to use. (Ex. `facebook/bart-large-cnn`)',
          required: true,
          list: false,
          altersDynamicFields: false,
        },
      ],
      sample: { summary_text: 'this is a summary of the text' },
      outputFields: [
        { key: 'summary_text', label: 'Summary Text', type: 'text' },
      ],
      perform: perform,
    },
    key: 'summarization',
    noun: 'Summary',
    display: {
      label: 'Summarization',
      description:
        'Use any compatible model from the Hugging Face to generate a summary of some text using an ML model.',
      hidden: false,
      important: true,
    },
  };
  