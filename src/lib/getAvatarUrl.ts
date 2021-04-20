

const getAvatarUrl = (sex: string) => {
  return `https://firebasestorage.googleapis.com/v0/b/picpic-310022.appspot.com/o/icons%2Favatars%2F${sex}.png?alt=media`;
};

export default getAvatarUrl;
