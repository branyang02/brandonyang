import { Text, Avatar, Heading, Pane } from 'evergreen-ui';
import avatarImage from '../assets/Brandon_Yang.jpg';
import Contact from '../components/Contact';
import { useDarkMode } from '../context/DarkModeContext';

const Profile = () => {
    const { darkMode } = useDarkMode();

    return (
        <Pane display="flex" flexDirection="column" alignItems="center">
            <Avatar src={avatarImage} name="Brandon (Yifan) Yang" size={300} />
            <Heading
                size={900}
                marginTop={10}
                color={darkMode ? 'white' : 'default'}
            >
                Brandon (Yifan) Yang
            </Heading>
            <Text
                size={500}
                color={darkMode ? 'gray500' : 'muted'}
                marginTop={5}
            >
                Computer Science @ UVA
            </Text>
            <Contact />
        </Pane>
    );
};

export default Profile;
