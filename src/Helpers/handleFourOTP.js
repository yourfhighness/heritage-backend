const handleFourOTP = async (generatedCode) => {
  const randomDigit = () => Math.floor((Math.random() * 10));

  if (generatedCode.toString().length > 4) {
    const trimmedOTP = generatedCode.toString().substring(0, 4);
    return trimmedOTP;
  }

  if (generatedCode.toString().length < 4) {
    const fourDigitOTP = generatedCode.toString() + randomDigit();
    return fourDigitOTP;
  }

  return generatedCode;
};

export default handleFourOTP;
