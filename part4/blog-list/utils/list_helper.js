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

const mostBlogs = (blogs) => {
  const authors = {};
  blogs.forEach((blog) =>
    authors[blog.author] ? authors[blog.author]++ : (authors[blog.author] = 1)
  );

  const authorWithMostBlogs = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  );

  return { author: authorWithMostBlogs, blogs: authors[authorWithMostBlogs] };
};

const mostLikes = (blogs) => {
  const authors = {};
  blogs.forEach((blog) => {
    authors[blog.author]
      ? (authors[blog.author] += blog.likes)
      : (authors[blog.author] = blog.likes);
  });
  const authorWithMostLikes = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  );

  return { author: authorWithMostLikes, likes: authors[authorWithMostLikes] };
};

module.exports = { totalLikes, findFavorite, mostBlogs, mostLikes };
