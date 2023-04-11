const perform = async (z, bundle) => {
    const { HfInference } = z.require('@huggingface/inference');
    fetch = z.require('node-fetch');

    const audio = await fetch(bundle.inputData.file)
      .then((res) => res.arrayBuffer())
      .then((buffer) => Buffer.from(buffer));

    const hf = new HfInference(bundle.authData.key);
    const result = await hf.automaticSpeechRecognition({
      model: bundle.inputData.repo_id,
      data: audio
    })
    return result
  };
  
  module.exports = {
    operation: {
      inputFields: [
        { 
          key: 'file',
          required: true,
          type: 'file',
          label: 'File',
          helpText: 'The audio file (or URL) to transcribe.',
        },
        {
          key: 'repo_id',
          label: 'Repo ID',
          type: 'string',
          helpText:
            'The Repo ID for the model you wish to use. (Ex. `openai/whisper-tiny.en`)',
          required: true,
          list: false,
          altersDynamicFields: false,
        },
      ],
      sample: { text: 'the quick brown fox jumped over the lazy dog' },
      outputFields: [
        { key: 'text', label: 'Text', type: 'text' },
      ],
      perform: perform,
    },
    key: 'automatic_speech_recognition',
    noun: 'Transcription',
    display: {
      label: 'Automatic Speech Recognition',
      description:
        'Use any compatible model from the Hugging Face to transcribe audio to text.',
      hidden: false,
      important: false,
    },
  };
  