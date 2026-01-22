import {
    Pane,
    Text,
    majorScale,
    IconButton,
    ChevronLeftIcon,
    ChevronRightIcon,
    Heading,
    UnorderedList,
    ListItem,
} from "evergreen-ui";
import { useDarkMode } from "../context/DarkModeContext";
import { Helmet } from "react-helmet";
import { useState, useRef } from "react";
import MarkdownParagraph from "../components/MarkdownParagraph";

const Fun = () => {
    const { darkMode } = useDarkMode();
    const [photoIndex, setPhotoIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const slideRef = useRef<HTMLDivElement>(null);

    const skiDestinations = [
        { place: "Niseko", date: "01/2020", flag: "🇯🇵" },
        { place: "Whistler Blackcomb, BC", date: "12/2023", flag: "🇨🇦" },
        { place: "Koktokay", date: "12/2024", flag: "🇨🇳" },
        { place: "Breckenridge, CO", date: "01/2025", flag: "🇺🇸" },
        { place: "Vail, CO", date: "01/2025", flag: "🇺🇸" },
        { place: "Snowshoe, WV", date: "02/2025", flag: "🇺🇸" },
        { place: "Heavenly, CA", date: "03/2025", flag: "🇺🇸" },
        { place: "Killington, VT", date: "11/2025", flag: "🇺🇸" },
        { place: "Hemu", date: "12/2025", flag: "🇨🇳" },
        { place: "Altay", date: "12/2025", flag: "🇨🇳" },
    ];

    const photos = [
        {
            src: "https://branyang02.github.io/images/breck.jpg",
            caption:
                "On top of Imperial Express SuperChair, the highest chairlift in North America at Breckenridge.",
        },
        {
            src: "https://branyang02.github.io/images/koktokay.jpg",
            caption: "Crazy sunset view at Koktokay, Xinjiang.",
            offsetY: "70%",
        },
        {
            src: "https://branyang02.github.io/images/tahoe.png",
            caption: "Lake Tahoe view from Heavenly Mountain Resort.",
        },
        {
            src: "https://branyang02.github.io/images/vail.jpg",
            caption: "The Legendary Back Bowls! My favorite was Sun Down Bowl.",
            offsetY: "90%",
        },
        {
            src: "https://branyang02.github.io/images/whistler.jpg",
            caption: "Nice morning from 7th Heaven at Whistler Blackcomb.",
        },
    ];

    const lineColor = darkMode ? "#444" : "#ddd";
    const dotColor = darkMode ? "#888" : "#999";
    const textColor = darkMode ? "white" : "default";
    const mutedColor = darkMode ? "#888" : "muted";

    // Create extended array with clones for infinite scroll
    const extendedPhotos = [
        photos[photos.length - 1], // Clone of last at beginning
        ...photos,
        photos[0], // Clone of first at end
    ];

    const prevPhoto = () => {
        if (photoIndex === 1) {
            // At first image, jump to end clone instantly, then animate left
            setIsTransitioning(false);
            setPhotoIndex(extendedPhotos.length - 1);
            setTimeout(() => {
                setIsTransitioning(true);
                setPhotoIndex(photos.length);
            }, 20);
        } else {
            setIsTransitioning(true);
            setPhotoIndex((prev) => prev - 1);
        }
    };

    const nextPhoto = () => {
        if (photoIndex === photos.length) {
            // At last image, jump to start clone instantly, then animate right
            setIsTransitioning(false);
            setPhotoIndex(0);
            setTimeout(() => {
                setIsTransitioning(true);
                setPhotoIndex(1);
            }, 20);
        } else {
            setIsTransitioning(true);
            setPhotoIndex((prev) => prev + 1);
        }
    };

    // Get the actual photo index for display
    const displayIndex =
        photoIndex === 0
            ? photos.length - 1
            : photoIndex === extendedPhotos.length - 1
              ? 0
              : photoIndex - 1;

    const skiText = `
I started snowboarding in 2015 while briefly living in Düsseldorf, Germany. [Alpenpark Neuss](https://neuss.snowworld.com/piste.html) had an indoor slope that was perfect for learning the basics. My first real mountain trip was to [Saalbach-Hinterglemm](https://www.saalbach.com/en/winter) in Austria with my school in 2016, followed by a trip to Switzerland in 2017. Since then, I've been traveling to ski resorts around the world whenever I get the chance. Add me on [Slopes](https://my.getslopes.com/app/addFriend/xD3k6eJPQv)!

Can't forget the local resorts I love:
    `;

    return (
        <div>
            <Helmet>
                <title>fun | Brandon Y. Yang</title>
                <meta
                    name="description"
                    content="Fun activities and hobbies of Brandon Y. Yang."
                />
            </Helmet>
            <Pane
                display="flex"
                flexDirection="column"
                paddingBottom={majorScale(6)}
                paddingX={majorScale(8)}
                marginX="auto"
            >
                {/* Skiing/Snowboarding Header */}
                <Heading
                    marginTop={majorScale(2)}
                    size={800}
                    marginBottom={majorScale(2)}
                    color={darkMode ? "white" : "default"}
                >
                    🏂🎿 Snowboarding & Skiing
                </Heading>
                {/* Timeline and Photo Slideshow side by side */}
                <Pane
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={majorScale(4)}
                    width="100%"
                    maxWidth={1000}
                    marginX="auto"
                    flexWrap="wrap"
                >
                    {/* Timeline */}
                    <Pane flexShrink={0} marginRight={majorScale(4)}>
                        {skiDestinations.map((dest, index) => (
                            <Pane
                                key={index}
                                display="flex"
                                alignItems="stretch"
                                minHeight={44}
                            >
                                {/* Date */}
                                <Pane
                                    width={80}
                                    display="flex"
                                    justifyContent="flex-end"
                                    paddingRight={majorScale(2)}
                                    paddingTop={2}
                                >
                                    <Text
                                        size={300}
                                        color={mutedColor}
                                        fontFamily="monospace"
                                    >
                                        {dest.date}
                                    </Text>
                                </Pane>

                                {/* Line and dot */}
                                <Pane
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    width={20}
                                >
                                    <Pane
                                        width={10}
                                        height={10}
                                        borderRadius="50%"
                                        backgroundColor={dotColor}
                                        marginTop={5}
                                        flexShrink={0}
                                        zIndex={1}
                                    />
                                    {index < skiDestinations.length - 1 && (
                                        <Pane
                                            width={2}
                                            flex={1}
                                            backgroundColor={lineColor}
                                            marginTop={-2}
                                            marginBottom={-2}
                                        />
                                    )}
                                </Pane>

                                {/* Place and flag */}
                                <Pane
                                    paddingLeft={majorScale(2)}
                                    paddingBottom={majorScale(2)}
                                    display="flex"
                                    alignItems="flex-start"
                                    gap={majorScale(1)}
                                    paddingTop={2}
                                >
                                    <Text fontSize={16} lineHeight={1}>
                                        {dest.flag}
                                    </Text>
                                    <Text
                                        size={400}
                                        color={textColor}
                                        fontWeight={500}
                                    >
                                        {dest.place}
                                    </Text>
                                </Pane>
                            </Pane>
                        ))}
                    </Pane>

                    {/* Photo Slideshow */}
                    <Pane
                        flex={1}
                        minWidth={300}
                        maxWidth={600}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Pane
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={majorScale(2)}
                            width="100%"
                        >
                            <IconButton
                                icon={ChevronLeftIcon}
                                appearance="minimal"
                                onClick={prevPhoto}
                            />
                            <Pane
                                overflow="hidden"
                                borderRadius={8}
                                width="100%"
                                maxWidth={500}
                                elevation={darkMode ? undefined : 2}
                                border={
                                    darkMode
                                        ? `1px solid ${lineColor}`
                                        : undefined
                                }
                            >
                                <Pane
                                    ref={slideRef}
                                    display="flex"
                                    style={{
                                        transform: `translateX(-${photoIndex * 100}%)`,
                                        transition: isTransitioning
                                            ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                                            : "none",
                                    }}
                                >
                                    {extendedPhotos.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo.src}
                                            alt={photo.caption}
                                            style={{
                                                width: "100%",
                                                flexShrink: 0,
                                                height: "auto",
                                                display: "block",
                                                aspectRatio: "4 / 3",
                                                objectFit: "cover",
                                                objectPosition: `center ${photo.offsetY ?? "50%"}`,
                                            }}
                                        />
                                    ))}
                                </Pane>
                            </Pane>
                            <IconButton
                                icon={ChevronRightIcon}
                                appearance="minimal"
                                onClick={nextPhoto}
                            />
                        </Pane>
                        <Text
                            size={300}
                            color={mutedColor}
                            marginTop={majorScale(2)}
                            display="block"
                            textAlign="center"
                            fontStyle="italic"
                        >
                            {photos[displayIndex].caption}
                        </Text>
                    </Pane>
                </Pane>
                <Heading
                    size={500}
                    marginBottom={majorScale(2)}
                    color={darkMode ? "white" : "default"}
                >
                    I am currently looking for ski buddies for a trip to Mammoth
                    in March 2026! Contact me if interested.
                </Heading>
                <MarkdownParagraph text={skiText} />
                <UnorderedList
                    size={500}
                    color={darkMode ? "rgb(245, 244, 239)" : "default"}
                >
                    <ListItem>
                        <MarkdownParagraph text="[Wintergreen Resort, VA](https://www.wintergreenresort.com/)" />
                    </ListItem>
                    <ListItem>
                        <MarkdownParagraph text="[Massanutten Resort, VA](https://www.massresort.com/)" />
                    </ListItem>
                    <ListItem>
                        <MarkdownParagraph text="[Canaan Valley Resort, WV](https://www.canaanresort.com/)" />
                    </ListItem>
                    <ListItem>
                        <MarkdownParagraph text="[Seven Springs, PA](https://www.7springs.com/)" />
                    </ListItem>
                </UnorderedList>
                <MarkdownParagraph
                    text={
                        "I recently started learning to ski after years of snowboarding, and it's ridiculously fun too. \n \nHere are my gears:"
                    }
                />
                <UnorderedList
                    size={500}
                    color={darkMode ? "rgb(245, 244, 239)" : "default"}
                >
                    <ListItem>
                        <MarkdownParagraph
                            text={
                                "[Burton Custom Camber Snowboard 165](https://www.burton.com/us/en/p/mens-burton-custom-camber-snowboard/W24-106881.html)"
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <MarkdownParagraph
                            text={"Burton Step On Bindings and Boots"}
                        />
                    </ListItem>
                    <ListItem>
                        <MarkdownParagraph text={"DynaStar Speed"} />
                    </ListItem>
                </UnorderedList>
                <MarkdownParagraph
                    text={
                        "My future goals are (1) get better at skiing, (2) learn to ride posi-posi, (3) get a carving snowboard."
                    }
                />

                <Heading
                    marginTop={majorScale(2)}
                    size={800}
                    marginBottom={majorScale(2)}
                    color={darkMode ? "white" : "default"}
                >
                    Pickleball
                </Heading>
                <MarkdownParagraph text="I'm probably a 3.8 - 4.0 singles and doubles. Meet me at [Bounce](https://www.bouncepb.com/philadelphia) and [Ballers](https://www.ballers-us.com/location/philadelphia) in Philadelphia." />
                <Heading
                    marginTop={majorScale(2)}
                    size={800}
                    marginBottom={majorScale(2)}
                    color={darkMode ? "white" : "default"}
                >
                    🏸 Badminton
                </Heading>
                <MarkdownParagraph text="Lost to 12 year olds in tournament in Raleigh. SMH. Meet me at [Club 28 Philadelphia](https://www.club28badminton.com/philadelphia)." />
                <Heading
                    marginTop={majorScale(2)}
                    size={800}
                    marginBottom={majorScale(2)}
                    color={darkMode ? "white" : "default"}
                >
                    ⛰️ Hiking
                </Heading>
                <MarkdownParagraph text="Definitely need to hike more. My favorite trails are:" />
                <UnorderedList
                    size={500}
                    color={darkMode ? "rgb(245, 244, 239)" : "default"}
                >
                    <ListItem>
                        <MarkdownParagraph text="[Old Rag Mountain, Shenandoah National Park](https://www.nps.gov/places/old-rag.htm)" />
                    </ListItem>
                    <ListItem>
                        <MarkdownParagraph text="[Mist Trail, Yosemite National Park](https://www.nps.gov/yose/index.htm)" />
                    </ListItem>
                </UnorderedList>
                <MarkdownParagraph text="I really want to do Half Dome one day. Also need to hit up Zion." />
            </Pane>
        </div>
    );
};

export default Fun;
