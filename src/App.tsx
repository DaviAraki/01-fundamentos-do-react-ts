import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post } from './components/Post';

import './global.css';

import styles from './App.module.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/daviaraki.png',
      name: 'Davi Araki',
      role: 'CEO @RPGBond',
    },
    content: [
      { type: 'paragraph', content: 'Fala Galera!' },
      {
        type: 'paragraph',
        content:
          'Teste linha 2 deve ser longa para testar o texto longo, beeeeeeeeeeeeeeem longo mesmo tipo passar da linha do VS code',
      },
      { type: 'link', content: 'https://github.com/daviaraki' },
    ],
    publishedAt: new Date('2022-06-15 12:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/daviaraki.png',
      name: 'Davi Araki 2',
      role: 'CEO @RPGBond',
    },
    content: [
      { type: 'paragraph', content: 'Fala Galera!' },
      {
        type: 'paragraph',
        content:
          'Teste linha 2 deve ser longa para testar o texto longo, beeeeeeeeeeeeeeem longo mesmo tipo passar da linha do VS code',
      },
      { type: 'link', content: 'https://github.com/daviaraki' },
    ],
    publishedAt: new Date('2022-06-16 12:00:00'),
  },
];

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
