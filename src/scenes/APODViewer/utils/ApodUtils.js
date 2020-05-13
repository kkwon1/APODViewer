class ApodUtils {
  getMaxChars(subtitle) {
    return subtitle.substring(0, 200);
  }

  displayText(subtitle) {
    if (subtitle && subtitle.length > 0) {
      return this.getMaxChars(subtitle) === subtitle
        ? subtitle
        : this.getMaxChars(subtitle) + "...";
    } else return "";
  }
}

export default ApodUtils;
