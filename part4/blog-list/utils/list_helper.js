const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0);
};

const findFavorite = (blogs) => {
  let mostLiked = blogs.reduce(
    (most, current) => (current.likes > most.likes ? current : most),
    { title: "", author: "", likes: 0 }
  );
  ({ title, author, likes } = mostLiked);
  return { title, author, likes };
};

module.exports = { totalLikes, findFavorite };
