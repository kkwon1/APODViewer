const appStorage = window.localStorage;

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

  updateApodDataLocalStorage(apodData, action) {
    let rawUserData = appStorage.getItem("userData");
    let userData = JSON.parse(rawUserData);

    switch (action) {
      case "save":
        userData.UserSaves.push(apodData);
        break;
      case "unsave":
        userData.UserSaves = removeItem(userData.UserSaves, apodData.ApodDate);
        break;
      case "like":
        userData.UserLikes.push(apodData);
        break;
      case "unlike":
        userData.UserLikes = removeItem(userData.UserLikes, apodData.ApodDate);
        break;
      default:
        break;
    }

    appStorage.setItem("userData", JSON.stringify(userData));
  }
}

function removeItem(array, key) {
  let index = array.map((a) => a.ApodDate).indexOf(key);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

export default ApodUtils;
