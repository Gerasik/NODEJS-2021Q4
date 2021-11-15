const ALPHABET_LENGTH = 26;

const APP_ERROR_TYPES = {
  duplicate: 'duplicate',
  wrongCipherConfig: 'wrongCipherConfig',
  noInputPath: 'noInputPath',
  noOutputPath: 'noOutputPath',
  stream: 'stream',
  wrongPath: 'wrongPath',
};

const CIPHER_CONFIG_OPTION = 'cipher_config';
const INPUT_CONFIG_OPTION = 'input_config';
const OUTPUT_CONFIG_OPTION = 'output_config';

const CONFIG_OPTION_TO_APP_ERROR_TYPES = {
  [CIPHER_CONFIG_OPTION]: APP_ERROR_TYPES.wrongCipherConfig,
  [INPUT_CONFIG_OPTION]: APP_ERROR_TYPES.noInputPath,
  [OUTPUT_CONFIG_OPTION]: APP_ERROR_TYPES.noOutputPath,
};

const CLI_CONFIG_OPTIONS_TO_CONFIG_OPTION = {
  '-c': CIPHER_CONFIG_OPTION,
  '--config': CIPHER_CONFIG_OPTION,
  '-i': INPUT_CONFIG_OPTION,
  '--input': INPUT_CONFIG_OPTION,
  '-o': OUTPUT_CONFIG_OPTION,
  '--output': OUTPUT_CONFIG_OPTION,
};

const CONFIG_NAME_TO_CLI_CONFIG_OPTIONS = {
  [CIPHER_CONFIG_OPTION]: "-c / --config",
  [INPUT_CONFIG_OPTION]: "-i / --input",
  [OUTPUT_CONFIG_OPTION]: "-o / --output",
}

const RED_COLOR_CODE = '\x1b[31m';

module.exports = {
  CIPHER_CONFIG_OPTION,
  APP_ERROR_TYPES,
  INPUT_CONFIG_OPTION,
  OUTPUT_CONFIG_OPTION,
  CONFIG_OPTION_TO_APP_ERROR_TYPES,
  CONFIG_NAME_TO_CLI_CONFIG_OPTIONS,
  CLI_CONFIG_OPTIONS_TO_CONFIG_OPTION,
  RED_COLOR_CODE,
  ALPHABET_LENGTH,
}
