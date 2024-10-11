export const truncateTextByWordCount = (text, textLimit) => {
  if (text?.length > textLimit) {
    return text.slice(0, textLimit) + "...";
  }
  return text;
};
