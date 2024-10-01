import { Text, Heading, Pane, majorScale } from "evergreen-ui";
import Contact from "../components/Contact";
import { useDarkMode } from "../context/DarkModeContext";

const Profile = () => {
    const { darkMode } = useDarkMode();

    return (
        <Pane display="flex" flexDirection="column" alignItems="center">
            <Pane
                borderRadius="50%"
                width={majorScale(40)}
                height={majorScale(40)}
                overflow="hidden"
            >
                <img
                    src="Brandon_Yang.jpg"
                    alt="Brandon Y. Yang"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Pane>

            <Heading
                size={900}
                marginTop={10}
                color={darkMode ? "white" : "default"}
            >
                Brandon Y. Yang
            </Heading>
            <Text
                size={500}
                color={darkMode ? "gray500" : "muted"}
                marginTop={5}
            >
                Computer Science @ UVA
            </Text>
            <Contact />
        </Pane>
    );
};

export default Profile;
