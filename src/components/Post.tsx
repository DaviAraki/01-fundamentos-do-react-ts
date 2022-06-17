import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Cpu } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface IPostProps {
  author: IAuthor;
  publishedAt: Date;
  content: IContent[];
}

interface IContent {
  type: 'paragraph' | 'link';
  content: string;
}

interface IAuthor {
  name: string;
  role: string;
  avatarUrl: string;
}

export function Post({ author, content, publishedAt }: IPostProps) {
  const [comments, setComments] = useState(['Post muito bacana, hein!']);
  const [newComment, setNewComment] = useState('');

  function deleteComment(commentToDelete: string) {
    const newCommentArray = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(newCommentArray);
  }

  function handleInvalidComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  const publishedAtFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewComment(event.target.value);
  }

  const handleCreateComment = (event: FormEvent) => {
    event.preventDefault();

    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time dateTime={publishedAt.toISOString()} title={publishedAtFormatted}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          }
          if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href={line.content}>{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form className={styles.commentForm} onSubmit={handleCreateComment}>
        <strong>Deixe um comentário</strong>

        <textarea
          name='comment'
          placeholder='Escreva seu comentário...'
          value={newComment}
          onChange={handleNewCommentChange}
          onInvalid={handleInvalidComment}
          required
        />
        <footer>
          <button type='submit' disabled={newComment.length === 0}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              content={comment}
              key={comment}
              deleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
