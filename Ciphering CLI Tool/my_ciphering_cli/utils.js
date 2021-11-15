const {
  CONFIG_NAME_TO_CLI_CONFIG_OPTIONS,
  CONFIG_OPTION_TO_APP_ERROR_TYPES,
  CLI_CONFIG_OPTIONS_TO_CONFIG_OPTION,
  CIPHER_CONFIG_OPTION,
  INPUT_CONFIG_OPTION,
  OUTPUT_CONFIG_OPTION,
  RED_COLOR_CODE,
  APP_ERROR_TYPES,
} = require("./config")

const checkCriticalError = (errorType) => {
  return (
    errorType === APP_ERROR_TYPES.duplicate ||
    errorType === APP_ERROR_TYPES.wrongCipherConfig
  )
}

const setStringColor = (string, colorCode) => {
  return `${colorCode}${string}`
}

const validateCipherConfigValue = (cipherValue) => {
  const regExp = new RegExp(/^(((C|R)(0|1))|A)(-(((C|R)(0|1))|A))*$/)

  return regExp.test(cipherValue)
}

const validatePathValue = (path) => {
  return Boolean(path)
}

const ConfigOptionToValidateValueFunc = {
  [CIPHER_CONFIG_OPTION]: validateCipherConfigValue,
  [INPUT_CONFIG_OPTION]: validatePathValue,
  [OUTPUT_CONFIG_OPTION]: validatePathValue,
}

const ErrorTypeToStringBuilder = {
  [APP_ERROR_TYPES.duplicate]: ({ configOption }) =>
    `${CONFIG_NAME_TO_CLI_CONFIG_OPTIONS[configOption]} is duplicated in command line`,
  [APP_ERROR_TYPES.wrongCipherConfig]: ({ configOption, value }) =>
    `"${value}" is not correct for "${CONFIG_NAME_TO_CLI_CONFIG_OPTIONS[configOption]}" config option.`,
  [APP_ERROR_TYPES.noInputPath]: ({ configOption, value }) =>
    `The file path "${value}" is not provided for "${CONFIG_NAME_TO_CLI_CONFIG_OPTIONS[configOption]}" config option.\n Please write correct file path \n`,
  [APP_ERROR_TYPES.noOutputPath]: ({ configOption }) =>
    `The file path is not provided for "${CONFIG_NAME_TO_CLI_CONFIG_OPTIONS[configOption]}" config option. Chek the result in console.\n`,
  [APP_ERROR_TYPES.stream]: ({ error }) => `${error}\n`,
}

const errorMessageBuilder = (data, errorType) => {
  const errorString = `APP_ERROR: ${ErrorTypeToStringBuilder[errorType](data)}`

  return setStringColor(errorString, RED_COLOR_CODE)
}

/**
 * @param {string} targetName - One of '*_CONFIG_NAME': 'CIPHER_CONFIG_NAME', 'INPUT_CONFIG_NAME' and etc.;
 * @param {number} startIndex
 * @param {array[array]} configArray - [[configOption1, configValue1], [configOption2, configValue2], ...]
 *
 * @return { boolean }
 * */
const searchDuplicationName = (targetName, startIndex, configArray) => {
  return configArray.some(([configName]) => configName === targetName)
}

/**
 * @param {array[array]} transformedConfig - [[configOption1, configValue1], [configOption2, configValue2], ...]
 *
 * @returns {Object} validateInfo - The validation state <br/>
 * @returns {Object} validateInfo.error - Contains info about error (type, configOption, configOptionName) <br/>
 * @returns {boolean} validateInfo.isValid - Validation flag <br/>
 * */
const validateConfig = (transformedConfig) => {
  const result = transformedConfig.reduce(
    (acc, [configOption, configOptionValue], index, array) => {
      if (!acc.isValid) {
        return acc
      }

      const isDuplicatedConfigOption = searchDuplicationName(
        configOption,
        index,
        array.slice(index + 1)
      )
      const isValidValue =
        ConfigOptionToValidateValueFunc[configOption](configOptionValue)

      if (isDuplicatedConfigOption || !isValidValue) {
        acc.error.configOption = configOption
        acc.error.configOptionValue = configOptionValue
        acc.error.type = isDuplicatedConfigOption
          ? APP_ERROR_TYPES.duplicate
          : CONFIG_OPTION_TO_APP_ERROR_TYPES[configOption]
        acc.isValid = false

        return acc
      }

      return acc
    },
    {
      error: {
        type: null,
        configOption: null,
        configOptionValue: null,
      },
      isValid: true,
    }
  )

  return result
}

/**
 * @param {array[string]} cliConfigArray -[configName1, configValue1, configName2, configValue2, ...]
 *
 * @return {array} - [[configOption1, configValue1], [configOption2, configValue2], ...]
 * */
const transformConfig = (cliConfigArray) => {
  return cliConfigArray.reduce((acc, cliValue, index, array) => {
    const cliNextValue = array[index + 1]
    const isCurrentValueConfigOption =
      !!CLI_CONFIG_OPTIONS_TO_CONFIG_OPTION[cliValue]
    const isNextValueConfigOption = !!(
      cliNextValue && CLI_CONFIG_OPTIONS_TO_CONFIG_OPTION[cliNextValue]
    )

    if (isCurrentValueConfigOption) {
      const configOption = CLI_CONFIG_OPTIONS_TO_CONFIG_OPTION[cliValue]
      const configValue =
        !isNextValueConfigOption && cliNextValue ? cliNextValue : null

      acc.push([configOption, configValue])
    }

    return acc
  }, [])
}

/**
 * @param {array[string]} cliConfigArray -[configName1, configValue1, configName2, configValue2, ...].
 *
 * @return {Object} { error:Object, hasError:boolean, isCriticalError:boolean, config:Map } - application config information. <br/>
 * */
const buildAppConfigInfo = (cliConfigArray) => {
  const appConfigInfo = {
    errors: {
      type: null,
      configOption: null,
      configOptionValue: null,
    },
    isCriticalError: true,
    hasError: false,
    config: new Map(),
  }

  const transformedConfig = transformConfig(cliConfigArray)
  const { isValid, error } = validateConfig(transformedConfig)
  const hasCriticalError = checkCriticalError(error.type)

  if (!hasCriticalError) {
    appConfigInfo.config = new Map(transformedConfig)
  }

  appConfigInfo.hasError = !isValid
  appConfigInfo.isCriticalError = hasCriticalError
  appConfigInfo.error = error

  return appConfigInfo
}

module.exports = {
  errorMessageBuilder,
  buildAppConfigInfo,
}
