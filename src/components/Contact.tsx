import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link,
    ListItem,
    majorScale,
    Pane,
    UnorderedList,
    Text,
} from "evergreen-ui";
import { useDarkMode } from "../context/DarkModeContext";

const Contact = () => {
    const { darkMode } = useDarkMode();

    const contactItems = [
        {
            icon: faEnvelope,
            href: "mailto:branyang@virginia.edu",
            text: "branyang@virginia.edu",
        },
        {
            icon: faGithub,
            href: "https://github.com/branyang02",
            text: "branyang02",
        },
        {
            icon: faLinkedin,
            href: "https://linkedin.com/in/byang02",
            text: "in/byang02",
        },
    ];

    return (
        <Pane padding={majorScale(1)}>
            <UnorderedList>
                {contactItems.map(({ icon, href, text }) => (
                    <ListItem
                        key={href}
                        icon={
                            <FontAwesomeIcon
                                icon={icon}
                                size="lg"
                                color={darkMode ? "#c1c4d6" : undefined}
                            />
                        }
                    >
                        <Link href={href} marginRight={12} color="neutral">
                            <Text color={darkMode ? "gray500" : "muted"}>
                                {text}
                            </Text>
                        </Link>
                    </ListItem>
                ))}
            </UnorderedList>
        </Pane>
    );
};

export default Contact;
