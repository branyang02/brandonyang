import { Pane, Image, majorScale } from "evergreen-ui";
import { useDarkMode } from "../context/DarkModeContext";
import MarkdownParagraph from "./MarkdownParagraph";

const Education = () => {
    const { darkMode } = useDarkMode();

    return (
        <Pane>
            <Pane
                display="flex"
                alignItems="center"
                marginBottom={majorScale(3)}
            >
                <Image
                    src={
                        darkMode
                            ? "https://branyang02.github.io/images/uva-seas-dark.svg"
                            : "https://branyang02.github.io/images/uva-seas.svg"
                    }
                    alt="UVA SEAS Logo"
                    maxWidth={majorScale(30)}
                    height="auto"
                    onClick={() =>
                        window.open(
                            "https://engineering.virginia.edu/",
                            "_blank"
                        )
                    }
                    cursor="pointer"
                />

                <Pane marginLeft={majorScale(2)} flexGrow={1}>
                    <MarkdownParagraph text="**BS in Computer Science**" />
                </Pane>

                <Pane marginLeft="auto">
                    <MarkdownParagraph text="2021 - 2025" />
                </Pane>
            </Pane>

            <Pane marginBottom={majorScale(3)}>
                <Pane display="flex" alignItems="center" width="100%">
                    <Image
                        src={
                            darkMode
                                ? "https://branyang02.github.io/images/penn-grasp-dark.svg"
                                : "https://branyang02.github.io/images/penn-grasp.svg"
                        }
                        alt="GRASP Lab Logo"
                        maxWidth={majorScale(30)}
                        height="auto"
                        onClick={() =>
                            window.open(
                                "https://www.grasp.upenn.edu/",
                                "_blank"
                            )
                        }
                        cursor="pointer"
                    />

                    <Pane marginLeft={majorScale(2)}>
                        <MarkdownParagraph text="**MSE in Roboitcs**" />
                        <MarkdownParagraph text="**MSE in Computer and Information Science**" />
                    </Pane>

                    <Pane marginLeft="auto">
                        <MarkdownParagraph text="2025 - Expected 2028" />
                    </Pane>
                </Pane>
            </Pane>
        </Pane>
    );
};

export default Education;
