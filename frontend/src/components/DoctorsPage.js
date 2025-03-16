import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Container,
  Fade,
  Button,
  Paper,
  Divider,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  useMediaQuery,
  Avatar,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Chat from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
import useStyles from "./Styles";
import Logo from "./Logo";
import SagipLogoAnimation from "./SagipLogoAnimation";
import { loadChatMessages, saveChatMessages } from "./util/ChatLocalStorage";

// DOCTORS DATA
const doctorsData = [
  {
    id: 0,
    name: "Dr. Marc Graven Cortez",
    description:
      "A Medical Practitioner from Control North, San Jose, San Simon, Pampanga.",
    img: "./images/graven.png",
    specialty: "General Medicine",
    education: "University of the Philippines Manila",
    experience: "15 years",
    availability: ["Monday", "Wednesday", "Friday"],
    contact: "+63 912 345 6789",
  },
  {
    id: 1,
    name: "Dr. Anna Marielle Pineda",
    description: "A Medical Practitioner from San Isidro, San Simon, Pampanga.",
    img: "./images/anna.png",
    specialty: "Pediatrics",
    education: "University of Santo Tomas",
    experience: "8 years",
    availability: ["Tuesday", "Thursday", "Saturday"],
    contact: "+63 923 456 7890",
  },
  {
    id: 2,
    name: "Dr. David Kyle Mallari",
    description:
      "The Best Medical Practitioner who can speak English straight.",
    img: "./images/david.png",
    specialty: "Internal Medicine",
    education: "Ateneo School of Medicine",
    experience: "12 years",
    availability: ["Monday", "Tuesday", "Friday"],
    contact: "+63 934 567 8901",
  },
  {
    id: 3,
    name: "Dr. Emmanuel Villafuerte",
    description: "A Medical Practitioner from San Pedro, San Simon, Pampanga",
    img: "./images/emman.png",
    specialty: "Cardiology",
    education: "Manila Central University",
    experience: "10 years",
    availability: ["Wednesday", "Thursday", "Saturday"],
    contact: "+63 945 678 9012",
  },
  {
    id: 4,
    name: "Dr. Christelle Ashley Santos",
    description: "A Medical Practitioner from Apalit, Pampanga",
    img: "./images/ash.png",
    specialty: "Dermatology",
    education: "De La Salle Health Sciences Institute",
    experience: "6 years",
    availability: ["Monday", "Wednesday", "Saturday"],
    contact: "+63 956 789 0123",
  },
  {
    id: 5,
    name: "Dr. Royce Anthony Collado",
    description: "A Medical Practitioner from Apalit, Pampanga",
    img: "./images/royce.png",
    specialty: "Surgeon",
    education: "University of Santo Tomas",
    experience: "6 years",
    availability: ["Monday", "Wednesday", "Saturday"],
    contact: "+63 956 789 0123",
  },
  {
    id: 6,
    name: "Dr. John Gabriel Gabon",
    description: "A Medical Practitioner from San Jose, San Simon, Pampanga",
    img: "./images/gab.png",
    specialty: "Cardiologist",
    education: "Ateneo School of Medicine",
    experience: "10 years",
    availability: ["Wednesday", "Thursday", "Saturday"],
    contact: "+63 945 678 9012",
  },
  {
    id: 7,
    name: "Dr. Bernard Jet Bautista",
    description: "A Medical Practitioner from San Simon, Pampanga",
    img: "./images/bernard.png",
    specialty: "Dietitian",
    education: "University of the Philippines Diliman",
    experience: "10 years",
    availability: ["Wednesday", "Thursday", "Saturday"],
    contact: "+63 945 678 9012",
  },
  {
    id: 8,
    name: "Dr. Cholo Gener Esguerra",
    description: "A Medical Practitioner from San Simon, Pampanga",
    img: "./images/cholo.png",
    specialty: "Dietitian",
    education: "University of the Philippines Diliman",
    experience: "10 years",
    availability: ["Wednesday", "Thursday", "Saturday"],
    contact: "+63 945 678 9012",
  },
];

// MESSENGER
const ChatWindow = ({ doctor, onClose, onMinimize }) => {
  const styles = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // LOCAL STORAGE
  useEffect(() => {
    if (doctor) {
      setMessages(loadChatMessages(doctor.id, doctor.name));
    }
  }, [doctor]);

  // SCROLL
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      text: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveChatMessages(doctor.id, updatedMessages);
    setMessage("");

    // BOT RESPONSE
    setTimeout(() => {
      const responseMessage = {
        text: getAutomaticResponse(doctor, message, updatedMessages.length >= 9),
        sender: "doctor",
        timestamp: new Date().toISOString(),
      };
      const withResponse = [...updatedMessages, responseMessage];
      setMessages(withResponse);
      saveChatMessages(doctor.id, withResponse);
    }, 1000 + Math.random() * 1000);
  };

  // GENERATE MESSAGE FOR BOT
  const getAutomaticResponse = (doctor, msg, showAppointmentButton) => {
    // If this is the 5th message or more (meaning user has sent 5 messages), show appointment button
    if (showAppointmentButton) {
      return (
        "I see we've been chatting for a while. Would you like to schedule an appointment with me? " +
        "Click the button below to proceed to appointment scheduling.\n\n" +
        "<appointment-button>"
      );
    }
    
    const msgLower = String(msg || "").toLowerCase();

    // DESC
    const extractLocation = (description) => {
      const fromIndex = description.toLowerCase().indexOf("from ");
      return fromIndex !== -1
        ? description.substring(fromIndex + 5).trim()
        : "our clinic";
    };

    const doctorLocation = extractLocation(doctor.description);

    const responses = {
      appointment: [
        `I'd be happy to help you schedule an appointment. I'm available on ${doctor.availability.join(
          ", "
        )}. Would any of those days work for you?`,
        `Sure! My available days are ${doctor.availability.join(
          ", "
        )}. Let me know what works best for you.`,
        `Let's get you scheduled! I'm available on ${doctor.availability.join(
          ", "
        )}. Which day would you prefer?`,
      ],
      greeting: [
        "Hello! How can I assist you today?",
        "Hi there! What can I do for you?",
        "Hey! Let me know how I can help.",
      ],
      thanks: [
        "You're welcome! Is there anything else I can help you with?",
        "No problem! Feel free to ask me anything.",
        "Glad I could help! Let me know if you need more assistance.",
      ],
      symptom: [
        `I understand you're not feeling well. As a ${doctor.specialty} specialist, I'd like to learn more about your symptoms. However, for a proper diagnosis, we'll need an appointment. Would you like to schedule one?`,
        `I'm here to help! If you're experiencing discomfort, a consultation would be the best step. Would you like to book one?`,
        `Your health is important! If you have symptoms, I recommend scheduling an appointment for a proper check-up.`,
      ],
      cost: [
        "Our consultation fees depend on the type of visit. For initial consultations, it's typically around ₱500-800. Would you like more information?",
        "The consultation fee varies depending on the service. Generally, it ranges from ₱500-800. Let me know if you'd like to proceed.",
        "Consultation fees are typically between ₱500-800. Would you like to schedule an appointment?",
      ],
      cancel: [
        "I understand you need to cancel or reschedule. Please provide your preferred date and time, and I'll check my availability.",
        "Need to reschedule? Just let me know your preferred date and time, and I'll adjust accordingly.",
        "I can assist you with rescheduling. Let me know a new date and time that works for you.",
      ],
      location: [
        `My clinic is located in ${doctorLocation}. Let me know if you need directions!`,
        `I am based in ${doctorLocation}. Feel free to visit me on my available days.`,
        `You can find me at ${doctorLocation}. Let me know if you'd like to book an appointment.`,
      ],
      circumcision: [
        "When and where would you like to avail of our circumcision service? Let us know your preferred schedule and location so we can assist you accordingly!",
        "Looking to avail our circumcision service? Let me know your preferred date and location, and I'll help you book an appointment.",
        "We offer safe and professional circumcision services. When would you like to schedule your appointment?",
      ],
      inappropriate: [
        "Let's keep our conversation professional and respectful.",
        "I'm here to assist with medical inquiries. Please keep our discussion appropriate.",
        "I aim to provide helpful and professional responses. Let's keep it respectful.",
        "Tanginamo.",
      ],
      default: [
        "Thank you for your message. To better assist you, would you like to book an appointment or do you have specific questions about my services?",
        "How can I assist you today? Feel free to ask about my services or book an appointment.",
        "I'm here to help! Let me know if you'd like to schedule a consultation or need medical advice.",
      ],
    };

    // RANDOMIZER FUNCTION
    const getRandomResponse = (category) => {
      const options = responses[category];
      return options[Math.floor(Math.random() * options.length)];
    };

    // RESPONSE LOGIC
    if (
      msgLower.includes("appointment") ||
      msgLower.includes("schedule") ||
      msgLower.includes("book")
    ) {
      return getRandomResponse("appointment");
    } else if (
      msgLower.includes("hello") ||
      msgLower.includes("hi") ||
      msgLower.includes("hey")
    ) {
      return getRandomResponse("greeting");
    } else if (msgLower.includes("thank") || msgLower.includes("thanks")) {
      return getRandomResponse("thanks");
    } else if (
      msgLower.includes("symptom") ||
      msgLower.includes("pain") ||
      msgLower.includes("feel")
    ) {
      return getRandomResponse("symptom");
    } else if (
      msgLower.includes("cost") ||
      msgLower.includes("fee") ||
      msgLower.includes("price")
    ) {
      return getRandomResponse("cost");
    } else if (msgLower.includes("cancel")) {
      return getRandomResponse("cancel");
    } else if (
      msgLower.includes("location") ||
      msgLower.includes("address") ||
      msgLower.includes("clinic")
    ) {
      return getRandomResponse("location");
    } else if (
      msgLower.includes("circumcision") ||
      msgLower.includes("tuli")
    ) {
      return getRandomResponse("circumcision");
    } else if (
      msgLower.includes("inamo") ||
      msgLower.includes("gago") ||
      msgLower.includes("ina mo")
    ) {
      return getRandomResponse("inappropriate");
    } else {
      return getRandomResponse("default");
    }
  };

  // TIMESTAMP
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // CHAT
  return (
    <Box
      sx={{
        width: 350,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: 10,
        borderRadius: "8px 8px 0 0",
        overflow: "hidden",
      }}
    >
      {/* NAME AND PICTURE */}
      <Box
        sx={{
          backgroundColor: "#208a3c",
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={doctor.img} alt={doctor.name} sx={{ marginRight: 2 }} />
          <Typography
            variant="subtitle2"
            className={`${styles.poppins} ${styles.bold}`}
            sx={{ color: "white" }}
          >
            {doctor.name}
          </Typography>
        </Box>
        <Box>
          <IconButton size="small" onClick={onMinimize} sx={{ color: "white" }}>
            <MinimizeIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* MESSAGE */}
      <Box
        sx={{
          flexGrow: 2,
          overflowY: "auto",
          padding: 2,
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              mb: 0.5,
            }}
          >
            {msg.sender === "doctor" && (
              <Avatar
                src={doctor.img}
                alt={doctor.name}
                sx={{ width: 42, height: 42, mr: 2, mt: 0.5 }}
              />
            )}
            <Box
              sx={{
                maxWidth: "70%",
                padding: 1.5,
                borderRadius:
                  msg.sender === "user"
                    ? "18px 18px 0 18px"
                    : "18px 18px 18px 0",
                backgroundColor: msg.sender === "user" ? "#1976d2" : "white",
                color: msg.sender === "user" ? "white" : "black",
                boxShadow: 1,
              }}
            >
              {msg.text.includes("<appointment-button>") ? (
                <>
                  <Typography variant="body2" className={styles.poppins}>
                    {msg.text.replace("<appointment-button>", "")}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/choose/appointment"
                    size="small"
                    sx={{ mt: 2 }}
                    className={styles.poppins}
                  >
                    Schedule Appointment
                  </Button>
                </>
              ) : (
                <Typography variant="body2" className={styles.poppins}>
                  {msg.text}
                </Typography>
              )}
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: msg.sender === "user" ? "right" : "left",
                  mt: 0.5,
                  opacity: 0.7,
                }}
              >
                {formatTime(msg.timestamp)}
              </Typography>
            </Box>
            {msg.sender === "user" && (
              <Avatar sx={{ width: 42, height: 42, ml: 2, mt: 0.5 }}>S</Avatar>
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* INPUT */}
      <Box
        sx={{
          padding: 2,
          backgroundColor: "white",
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Aa"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className={styles.poppins}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={message.trim() === ""}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

// BUBBLE
const ChatBubble = ({ doctor, onOpen, unreadCount }) => {
  const styles = useStyles();
  return (
    <Box
      onClick={() => onOpen(doctor)}
      sx={{
        position: "relative",
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: "#208a3c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: 3,
        "&:hover": {
          backgroundColor: "#176e30",
        },
        mb: 1,
      }}
    >
      {unreadCount > 0 && (
        <Badge
          badgeContent={unreadCount}
          color="error"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
      )}
      <Avatar
        src={doctor.img}
        alt={doctor.name}
        sx={{ width: 50, height: 50 }}
      />
    </Box>
  );
};

// MINIMIZED
const MinimizedChat = ({ doctor, onMaximize, onClose }) => {
  const styles = useStyles();
  return (
    <Box
      className={styles.main2}
      sx={{
        width: "100%",
        boxShadow: 3,
        backgroundColor: "#208a3c",
        color: "white",
        borderRadius: "8px 8px 0 0",
        padding: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", flex: 1 }}
        onClick={onMaximize}
      >
        <Avatar
          src={doctor.img}
          alt={doctor.name}
          sx={{ width: 24, height: 24, mr: 1 }}
        />
        <Typography variant="body2" noWrap sx={{ flex: 1 }}>
          {doctor.name}
        </Typography>
      </Box>
      <IconButton size="small" onClick={onClose} sx={{ color: "white" }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

// DOCTOR DETAILS LIGHTBOX
const DoctorDetailModal = ({ open, doctor, onClose, onChatNow }) => {
  const theme = useTheme();
  const styles = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!doctor) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2.5,
          overflow: "hidden",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.1000",
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 1 }}>
        <Grid container>
          {/* IMAGE */}
          <Grid item xs={12} md={5} className={styles.center}>
            <Box
              sx={{
                height: "100wh",
                width: "100%",
                minHeight: { xs: 300, md: 200 },
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <img
                src={doctor.img}
                alt={doctor.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
            </Box>
          </Grid>

          {/* INFO */}
          <Grid item xs={12} md={7}>
            <Box sx={{ p: 4 }}>
              <Typography
                variant="h4"
                className={`${styles.poppins} ${styles.bold}`}
              >
                {doctor.name}
              </Typography>

              <Typography
                variant="h6"
                color="#208a3c"
                className={`${styles.poppins} ${styles.bold}`}
                gutterBottom
              >
                {doctor.specialty}
              </Typography>

              <Typography variant="body1" className={`${styles.poppins}`}>
                {doctor.description}
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <Grid container spacing={0.25}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle1"
                    className={`${styles.poppins} ${styles.bold}`}
                  >
                    Education
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.poppins}
                    paragraph
                  >
                    {doctor.education}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle1"
                    className={`${styles.poppins} ${styles.bold}`}
                  >
                    Experience
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.poppins}
                    paragraph
                  >
                    {doctor.experience}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    className={`${styles.poppins} ${styles.bold}`}
                  >
                    Available Days
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.poppins}
                    paragraph
                  >
                    {doctor.availability.join(", ")}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    className={`${styles.poppins} ${styles.bold}`}
                  >
                    Contact Information
                  </Typography>
                  <Typography variant="body2" className={styles.poppins}>
                    {doctor.contact}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        className={`${styles.center}`}
        sx={{ p: 3, justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          startIcon={<Chat />}
          onClick={() => onChatNow(doctor)}
          className={`${styles.poppins} ${styles.cardhover} ${styles.green} ${styles.bold}`}
        >
          Chat Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// DOCTORS CARD UI
const DoctorCard = ({ doctor, onClick }) => {
  const styles = useStyles();

  return (
    <Card
      className={`${styles.card} ${styles.cardhover} ${styles.cardsize1}`}
      sx={{
        width: "100%",
        height: "auto",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",

        "@media (max-width: 600px)": {
          maxWidth: "250px", // Reduce size on small screens
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ position: "relative", paddingTop: "100%", width: "100%" }}>
          <CardMedia
            component="img"
            image={doctor.img}
            alt={doctor.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "#ffffff",
            }}
          />
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            className={`${styles.center} ${styles.bold} ${styles.spacing} ${styles.poppins}`}
            gutterBottom
          >
            {doctor.name}
          </Typography>
          <Typography
            color="#208a3c"
            variant="body2"
            className={`${styles.center} ${styles.italic} ${styles.spacing} ${styles.poppins}`}
          >
            {doctor.specialty}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// DOCTORS LIST PAGE
const DoctorsList = () => {
  const styles = useStyles();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
  const [minimizedChats, setMinimizedChats] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});

  const handleAnimationComplete = () => {
    setShowPage(true);
  };

  // If page is not yet ready to show, render the animation
  if (!showPage) {
    return <SagipLogoAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChatNow = (doctor) => {
    // If doctor is already in minimized chats, move to active
    if (minimizedChats.some((d) => d.id === doctor.id)) {
      setMinimizedChats(minimizedChats.filter((d) => d.id !== doctor.id));
      setActiveChats([...activeChats, doctor]);
      return;
    }

    // If doctor is not in active chats, add them
    if (!activeChats.some((d) => d.id === doctor.id)) {
      setActiveChats([...activeChats, doctor]);
    }

    setModalOpen(false);

    // Reset unread count for this doctor
    setUnreadCounts((prev) => ({
      ...prev,
      [doctor.id]: 0,
    }));
  };

  const handleCloseChat = (doctorId) => {
    setActiveChats(activeChats.filter((doctor) => doctor.id !== doctorId));
    setMinimizedChats(
      minimizedChats.filter((doctor) => doctor.id !== doctorId)
    );
  };

  const handleMinimizeChat = (doctor) => {
    setActiveChats(activeChats.filter((d) => d.id !== doctor.id));

    if (!minimizedChats.some((d) => d.id === doctor.id)) {
      setMinimizedChats([...minimizedChats, doctor]);
    }
  };

  const handleMaximizeChat = (doctor) => {
    setMinimizedChats(minimizedChats.filter((d) => d.id !== doctor.id));

    if (!activeChats.some((d) => d.id === doctor.id)) {
      setActiveChats([...activeChats, doctor]);
    }

    // Reset unread count
    setUnreadCounts((prev) => ({
      ...prev,
      [doctor.id]: 0,
    }));
  };

  // MAIN UI
  return (
    <Box
      sx={{ minHeight: "100vh" }}
      className={`${styles.root} ${styles.center2} ${styles.green}`}
    >
      <Fade in={true} timeout={1000}>
        <Container
          maxWidth="lg"
          className={`${styles.cardsContainer}`}
          sx={{ py: 2 }}
        >
          <Box
            my={"25px"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Logo large />
            <Typography
              variant="h6"
              className={`${styles.poppins} ${styles.center}`}
            >
              SAGIP APP
            </Typography>

            <Typography
              variant="h4"
              className={`${styles.poppins} ${styles.center} ${styles.bold}`}
              sx={{ mt: 2, mb: 1 }}
            >
              HEALTH PROFESSIONALS
            </Typography>
          </Box>

          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              width: "100%",
              margin: "0 auto",
              flexWrap: "wrap",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 1,
            }}
          >
            {doctorsData.map((doctor) => (
              <Grid
                item
                key={doctor.id}
                xs={12} // 1 column on extra small screens
                sm={6} // 2 columns on small screens
                md={4} // 3 columns on medium screens
                lg={3} // 4 columns on large screens
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <DoctorCard
                  doctor={doctor}
                  onClick={() => handleDoctorClick(doctor)}
                />
              </Grid>
            ))}
          </Grid>

          {/* DOCTOR DETAIL LIGHTBOX */}
          <DoctorDetailModal
            open={modalOpen}
            doctor={selectedDoctor}
            onClose={handleCloseModal}
            onChatNow={handleChatNow}
          />

          {/* Chat Windows - Fixed position at bottom right */}
          <Box
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1,
            }}
          >
            {/* Active Chat Windows */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              {activeChats.map((doctor) => (
                <Box
                  key={`chat-${doctor.id}`}
                  sx={{
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ChatWindow
                    doctor={doctor}
                    onClose={() => handleCloseChat(doctor.id)}
                    onMinimize={() => handleMinimizeChat(doctor)}
                  />
                </Box>
              ))}
            </Box>

            {/* Minimized Chat Windows */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
              }}
            >
              {minimizedChats.map((doctor) => (
                <MinimizedChat
                  key={`min-chat-${doctor.id}`}
                  doctor={doctor}
                  onMaximize={() => handleMaximizeChat(doctor)}
                  onClose={() => handleCloseChat(doctor.id)}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
};

export default DoctorsList;