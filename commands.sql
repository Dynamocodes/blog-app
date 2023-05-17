CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Author1', 'https://blog1.example.com', 'Blog 1', 10);
INSERT INTO blogs (author, url, title, likes) VALUES ('Author2', 'https://blog2.example.com', 'Blog 2', 20);