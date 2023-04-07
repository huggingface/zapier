const perform = async (z, bundle) => {
    const { HfInference } = z.require('@huggingface/inference');
    const hf = new HfInference(bundle.authData.key);
    const result = await hf.textGeneration({
      model: bundle.inputData.repo_id,
      inputs: bundle.inputData.text
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
          helpText: 'The text you wish to prompt the model to complete',
          required: true,
          list: false,
          altersDynamicFields: false,
        },
        {
          key: 'repo_id',
          label: 'Repo ID',
          type: 'string',
          helpText: 'The Repo ID for the model you wish to use. (Ex. `gpt2`)',
          required: true,
          list: false,
          altersDynamicFields: false,
        },
      ],
      sample: { label: 'NEG', score: 0.9814361929893494 },
      outputFields: [
        { key: 'generated_text', label: 'Generated Text', type: 'text' },
      ],
      perform: perform,
    },
    key: 'text_generation',
    noun: 'Completion',
    display: {
      label: 'Text Generation',
      description:
        'Use any compatible model from the Hugging Face to generate text using a ML model.',
      hidden: false,
      important: true,
    },
  };
  