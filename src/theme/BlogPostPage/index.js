import OriginalBlogPostPage from '@theme-original/BlogPostPage';

/**
 * Wrapper cho BlogPostPage - Comments được xử lý trong BlogPostItem
 */
export default function BlogPostPage(props) {
    return <OriginalBlogPostPage {...props} />;
}
