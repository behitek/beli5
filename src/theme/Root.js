import FloatingFeedbackButton from '@site/src/components/FloatingFeedbackButton';

/**
 * Root wrapper để thêm các components global như FloatingFeedbackButton
 * Component này sẽ wrap toàn bộ ứng dụng Docusaurus
 */
export default function Root({ children }) {
    return (
        <>
            {children}
            <FloatingFeedbackButton />
        </>
    );
}