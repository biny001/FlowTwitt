export function formatRelativeDate(dateString) {
  const now = new Date();
  const date = new Date(dateString);

  const diffInMilliseconds = now - date;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 1) {
    return `${diffInDays} days ago`;
  } else if (diffInDays === 1) {
    return "yesterday";
  } else if (diffInHours > 1) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours === 1) {
    return "an hour ago";
  } else if (diffInMinutes > 1) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes === 1) {
    return "a minute ago";
  } else {
    return "just now";
  }
}

export const checkIsLiked = (likeList, userId) => {
  return likeList.includes(userId);
};
