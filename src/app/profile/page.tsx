import { cookies } from 'next/headers';
import Image from 'next/image';
import { getMe, getMyArticles, getMyComments, getMyLikedArticles } from '../../services';

export default async function Profile() {
  // const [
  //   { data: myData },
  //   { data: myArticleData },
  //   { data: myCommentData },
  //   { data: myLikedArticleData },
  // ] = useQueries({
  //   queries: [
  //     { queryKey: ["hydrate-me"], queryFn: () => getMe() },
  //     {
  //       queryKey: ["myArticles"],
  //       queryFn: () => getMyArticles(),
  //     },
  //     { queryKey: ["myComments"], queryFn: () => getMyComments() },
  //     { queryKey: ["myLikedArticles"], queryFn: () => getMyLikedArticles() },
  //   ],
  // });

  const cookieHeader = cookies().toString();

  const myData = await getMe({ cookieHeader });
  const myArticleData = await getMyArticles({}, { cookieHeader });
  const myCommentData = await getMyComments({}, { cookieHeader });
  const myLikedArticleData = await getMyLikedArticles({}, { cookieHeader });

  return (
    <div>
      <Image src='/blushblush.png' alt='blush' width={100} height={100} />
      {myData && (
        <div>
          <h2 style={{ display: 'inline-block' }}>{myData.nickname}</h2>
          <span> is {myData.role}</span>
        </div>
      )}
      <div>
        <h3>정보</h3>
        <dl>
          <dt>Bio</dt>
          {/* <dd>42World & Rookies team</dd> */}
        </dl>
        <dl>
          <dt>지역</dt>
          <dd>서울</dd>
        </dl>
        <dl>
          <dt>소속</dt>
          <dd>42Seoul</dd>
        </dl>
      </div>
      <div>
        <h3>내 게시글</h3>
        {myArticleData && (
          <ul>
            {myArticleData.data.map((article: any, index: number) => (
              <li key={`my-article-${index}`}>{article.title}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>내 댓글</h3>
        {myCommentData && (
          <ul>
            {myCommentData.data.map((comment: any, index: number) => (
              <li key={`my-comment-${index}`}>{comment.content}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>좋아요한 게시글</h3>
        {myLikedArticleData && (
          <ul>
            {myLikedArticleData.data.map((article: any, index: number) => (
              <li key={`my-liked-article-${index}`}>{article.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
