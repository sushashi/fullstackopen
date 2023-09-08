CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('George Clooney', 'www.supergeorge.com', 'Title of some blog');
INSERT INTO blogs (author, url, title, likes) values ('Blogger XX', 'www.bloggerxx.com ', 'The super blog of some guy', 99);