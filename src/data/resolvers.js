import { find, filter } from 'lodash';
import {
  Posts,
  Authors
} from './data';

const test = {
    posts(author) {
        return filter(Posts, { authorId: author.id });
    }
};

const resolverMap = {
    Query: {
        posts() {
            return Posts;
        },
        authors() {
            return Authors;
        }
    },
    Mutation: {
        upvotePost(_, { postId }) {
            const post = find(Posts, { id: parseInt(postId, 10) });
            if (!post) {
                throw new Error(`Couldn't find post with id ${postId}`);
            }
            post.votes += 1;
            return post;
        }
    },
    Author: test,
    Post: {
        author(post) {
            return find(Authors, { id: post.authorId });
        }
    }
};

export default resolverMap;
