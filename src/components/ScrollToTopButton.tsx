import { useEffect, useState } from 'react';
import { ArrowUpIcon, Button, Pane } from 'evergreen-ui';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const toggleVisibility = () => {
        const currentScrollTop = window.pageYOffset;
        const closeToTop = currentScrollTop < 600;

        if (!closeToTop && currentScrollTop < lastScrollTop) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        setLastScrollTop(currentScrollTop);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [lastScrollTop]);

    return isVisible ? (
        <Pane
            zIndex={1000}
            position="fixed"
            top="10px"
            width="100%"
            display="flex"
            justifyContent="center"
            maxWidth="1000px"
        >
            <Button
                appearance="default"
                intent="none"
                onClick={scrollToTop}
                iconBefore={ArrowUpIcon}
            >
                Scroll to Top
            </Button>
        </Pane>
    ) : null;
};

export default ScrollToTopButton;
